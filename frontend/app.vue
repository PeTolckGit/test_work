<script setup lang="ts">
const apiUrl = 'http://localhost:3000/items';
const requestCount  = ref(10);
const delayMs = ref(1000);
const count = ref(0);
const success = ref(0);
const errors = ref(0);
const status = ref(false);
const startTime = ref(0);
const currTime = ref(0);
const offset = ref(0);
const limit = ref(10);
const paginate = ref(false);

let timeout: any = null;

const formatMs = (ms:number):string => {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const min = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  const msec = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(msec).padStart(3, '0')}`;
}

const send = () => {
    count.value++;
    fetch(urlToApi.value)
        .then(response => {
            
            if (!response.ok) {         
                errors.value++;   
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            success.value++;
            currTime.value = (new Date()).getTime();
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            currTime.value = (new Date()).getTime();
            errors.value++;
        });
    if (count.value < requestCount.value && status.value) {
        if (paginate.value){
            offset.value += limit.value;
        }
        timeout = setTimeout(send, delayMs.value);
    }
    else { 
        status.value = false;
    }
}

const start = () => {
    console.log('start sended');
    status.value = true;
    count.value = 0;
    success.value = 0;
    errors.value = 0;
    startTime.value = (new Date()).getTime();
    send();
    //timeout = setInterval(send, delayMs.value);
}

const stop = async () => {
    if (confirm('прервать тестирование?')) {
        status.value = false;
        clearTimeout(timeout);
    }
    return false;
}

const timeAll = computed(() => {
    return currTime.value - startTime.value;
});

const urlToApi = computed(() => {
    let url = apiUrl;
    if (paginate.value) {
        const params = new URLSearchParams();
        params.append('offset', offset.value.toString());
        params.append('limit', limit.value.toString());
        url += `?${params.toString()}`;
    }
    return url;
});

</script>
<template>
    <div class="main">
        <div class="container">
            <form method="get" action="/items">
                <div>
                    <div>
                        <label title="Количество запросов для отправки на сервер">Запросы</label>
                        <br />
                        <input type="number" v-model="requestCount" placeholder="Запросы"></input>
                        <br />
                    </div>
                    <div>
                        <label title="Время в милисекундах между запросами">Задержка(ms)</label>
                        <br />
                        <input type="number" v-model="delayMs" placeholder="Задержка(ms)"></input>
                        <br />
                    </div>
                </div>
                <fieldset>
                    <legend>Поэтапная загрузка<input type="checkbox" v-model="paginate"></input></legend>
                    <div>
                        <div>
                            <label title="С какой позиции начать выборку из БД">Смещение(offset)</label>
                            <br />
                            <input type="number" v-model="offset" placeholder="Смещение" :disabled="!paginate"></input>
                            <br />
                        </div>
                        <div>
                            <label title="Количество запрашиваемых строк">Количество(limit)</label>
                            <br />
                            <input type="number" v-model="limit" min="1" placeholder="Количество" :disabled="!paginate"></input>
                            <br />
                        </div>
                    </div> 
                </fieldset>               
                <div class="buttons">
                    <button @click="start" v-show="!status" type="button">Старт</button>
                    <button v-show="status" @click="stop" type="button">Прервать</button>
                </div>      
            </form>
            <table>
                <tbody>
                    <tr>
                        <td>запросов отправлено:</td>
                        <td><b>{{ count }}</b></td>
                    </tr>
                    <tr>
                        <td>выполнено успешно:</td>
                        <td><b>{{ success }}</b></td>
                    </tr>
                    <tr>
                        <td>завершилось ошибкой:</td>
                        <td><b>{{ errors }}</b></td>
                    </tr>
                    <tr>
                        <td>время выполнения:</td>
                        <td><b>{{ formatMs(timeAll) }}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>
    form > div, form fieldset > div {
        display: flex;
        padding-top: 30px;
    }

    form > div > div, form fieldset > div > div {
        margin-right: 10px;
    }    

    label {
        text-decoration: underline;
    }

    div > button:last-child {
        margin-left: 5px;
    }    

    .main {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container{
        display: inline-block;
    }

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

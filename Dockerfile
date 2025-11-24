FROM node:20.19.5 as base_build

WORKDIR /work-by-petolck

FROM base_build as front_build

WORKDIR /work-by-petolck

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
ADD ./frontend ./
RUN npm run generate

FROM base_build as back_build

WORKDIR /work-by-petolck

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
ADD ./backend ./
RUN npm run build

FROM node:20.19.5 as final

WORKDIR /work-by-petolck
COPY --from=back_build /work-by-petolck /work-by-petolck
COPY --from=front_build /work-by-petolck/dist /work-by-petolck/static

CMD npm run start



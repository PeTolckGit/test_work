import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private ItemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const Item = this.ItemsRepository.create(createItemDto);
    return this.ItemsRepository.save(Item);
  }

  async findAll(): Promise<Item[]> {
    return this.ItemsRepository.find();
  }

  async find(params: object): Promise<Item[]> {
    return this.ItemsRepository.find(params);
  }

  async findOne(id: number): Promise<Item> {
    const Item = await this.ItemsRepository.findOneBy({ id });
    if (!Item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return Item;
  }
}

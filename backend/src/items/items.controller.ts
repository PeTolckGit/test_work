import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import type { findData } from './types';

const defaultOffset: number = 0;
const defaultLimit: number = 10;

@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  @Get()
  findAll(@Query() params: findData) {
    const reqParams: { skip?: number; take?: number } = {};
    const { offset, limit }: findData = params;

    if (offset !== undefined) {
      Object.assign(reqParams, { skip: offset });
    }
    if (limit !== undefined) {
      Object.assign(reqParams, { take: limit });
    }

    console.log(
      'getAllItems reqParams: ',
      reqParams,
      '; offset: ',
      offset,
      '; limit: ',
      limit,
    );
    return this.ItemsService.find(reqParams);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ItemsService.findOne(id);
  }
}

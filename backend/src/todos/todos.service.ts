import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}
  create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({ data: createTodoDto });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: string) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}

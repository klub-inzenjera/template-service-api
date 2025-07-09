import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getTodos(): Promise<Todo[]> {
    return this.todoRepo.find();
  }

  async createTodo(data: {
    title: string;
    completed?: boolean;
  }): Promise<Todo> {
    const todo = this.todoRepo.create(data);
    return this.todoRepo.save(todo);
  }

  async updateTodo(
    id: number,
    data: { title?: string; completed?: boolean },
  ): Promise<Todo | null> {
    const todo = await this.todoRepo.findOneBy({ id });
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    await this.todoRepo.update(id, data);
    return this.todoRepo.findOneBy({ id });
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepo.delete(id);
  }
}

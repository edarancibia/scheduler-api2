import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class CustomerRepository extends Repository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly repo: Repository<Customer>,
  ) {
    super(repo.target, repo.manager, repo.queryRunner);
  }

  async searchByBusinessIdAndName(businessId: number, query: string): Promise<Customer[]> {
    return this.find({
      where: [
        {
          business: { id: businessId },
          name: ILike(`%${query}%`)
        },
        {
          business: { id: businessId },
          lastname: ILike(`%${query}%`)
        }
      ],
      relations: ['business']
    });
  }
  
}

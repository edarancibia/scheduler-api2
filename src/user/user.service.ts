import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './createUser.dto';
import { Cron } from '@nestjs/schedule';
import UserInvitation from './userInvitation.entity';
import CreateInvitationDto from './createInvitation.dto';
import { Business } from '../business/business.entity';
import { MailService } from '../mail/mail.service';
import { Mail } from '../mail/mail.interface';


@Injectable()
export default class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserInvitation)
    private readonly invitationRepo: Repository<UserInvitation>,
    @InjectRepository(Business)
    private readonly businessRepo: Repository<Business>,
    private readonly mailService: MailService,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(userDto);
      const createdUser = await this.userRepository.save(newUser);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findUserById(idUser: number): Promise<User> {
    try {
        return await this.userRepository.findOne({ where: { id: idUser } })
    } catch (error) {
        throw error;
    }
  }

  async createInvitation(invitationData: CreateInvitationDto): Promise<UserInvitation> {
    const { userId, businessId, destinationEmail } = invitationData;

    try {
      const invitation = new UserInvitation();

      const user = await this.userRepository.findOne({ where: { id: userId} });
      const business = await this.businessRepo.findOne({ where: { id: businessId} })

      invitation.userId = user;
      invitation.businessId = business;
      invitation.destinationEmail = destinationEmail;
      invitation.status = 'pending';
      invitation.createdAt = new Date();

      return await this.invitationRepo.save(invitation);
    } catch (error) {
      throw error;
    }
  }

  @Cron('*/5 * * * *')
  async processUserInvitations(): Promise<void> {
    this.logger.log('Cron running');

    const pendingInvitations = await this.invitationRepo.find({ where: { status: 'pending'} });

    if (pendingInvitations.length == 0) {
      this.logger.log(`[MailService] No pending invitations`);

      return;
    }

    for (let invitation of pendingInvitations) {
      let mail: Mail = {
        subject: 'Invitation to join',
        to: invitation.destinationEmail,
        text: 'Te han invitado a unirte',
      };

      this.logger.log(`[MailService] Sending mail: ${mail}`);

      await this.mailService.sendEmail(mail);

      invitation.status = 'done';
      invitation.updatedAt = new Date();

      await this.invitationRepo.save(invitation);
    }

    console.log(pendingInvitations)
  }
}

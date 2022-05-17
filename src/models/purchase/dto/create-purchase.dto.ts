import { OmitType } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';
import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';
import { Purchase } from '../entities/purchase.entity';

/** Describes the fields needed to create a Purchase */
export class CreatePurchaseDto extends OmitType(Purchase, [
  'id',
  'userId',
  'createdAt',
  'reviewNote',
  'reviewComment',
]) {
  /** Product ID as UUID
   * @example "5c68ae94-bf3e-4fde-b01f-25d18b3976a0"
   */
  @IsUUID(4)
  productId: string;

  /** Amount purchased of the product
   * Defaults to 1
   * @example 2
   */
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;

  /** Price payed per product multiplied by the amount
   * Saved as decimal, calculations should be handled
   * with currency.js
   * @example 138.75
   */
  @IsNumber()
  @IsPositive()
  totalPrice: string | number | Decimal;
}

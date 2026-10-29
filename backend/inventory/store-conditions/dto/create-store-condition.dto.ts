export class CreateStoreConditionDto {
  itemId: string;
  storeId: string;
  minTemperatureC: number;
  maxTemperatureC: number;
  humidityControlled: boolean;
}

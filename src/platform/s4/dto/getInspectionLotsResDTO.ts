export class GetInspectionLotsResDTO {
  id: string;
  plant: string;
  objectText: string;
  quantity: string;
  unit: string;
  startDate: string;
  endDate: string;
  changedDate: string;

  constructor(data: {
    id: string;
    plant: string;
    objectText: string;
    quantity: string;
    unit: string;
    startDate: string;
    endDate: string;
    changedDate: string;
  }) {
    this.id = data.id;
    this.plant = data.plant;
    this.objectText = data.objectText;
    this.quantity = data.quantity;
    this.unit = data.unit;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.changedDate = data.changedDate;
  }
}

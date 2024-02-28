import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeliveryCondition } from '../../Entities/DeliveryCondition';
import { RestaurantDataService } from '../../services/restaurant-data-service.service';

@Component({
  selector: 'app-delivery-condition-list-item',
  templateUrl: './delivery-condition-list-item.component.html',
  styleUrls: ['./delivery-condition-list-item.component.scss']
})
export class DeliveryConditionListItemComponent {
  @Input() deliveryCondition:DeliveryCondition = new DeliveryCondition();
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  @Output() updateEvent: EventEmitter<DeliveryCondition> = new EventEmitter();

  handleDeleteClick(){
    if(window.confirm('Are you sure you want to permanently delete this delivery condition?')){
      this.deleteEvent.emit(this.deliveryCondition.id);        
    }
  }

  handleUpdateClick(){
    console.log('update button handler');        
      this.updateEvent.emit(this.deliveryCondition);
  }
  
  ngOnInit(){
    console.log(this.deliveryCondition.FreeDeliveryMinTotal as number);
    
  }
  constructor(
    private restaurantDataService:RestaurantDataService
  ){}


}

export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const RestaurantRFormErrorMessages = [
  new ErrorMessage('name', 'required', 'You must enter a name'),
  new ErrorMessage('name', 'minLength', 'The name must be at least 4 characters long'),

  new ErrorMessage('address', 'required', 'You must enter an Address'),

  new ErrorMessage('latitude', 'required', 'You must enter a latitude'),
  new ErrorMessage('latitude', 'pattern', 'the latitude must be a decimal value'),

  new ErrorMessage('longitude', 'required', 'You must enter a longitude'),
  new ErrorMessage('longitude', 'pattern', 'the longitude must be a decimal value'),

  new ErrorMessage('hours', 'required', 'You must enter your business hours'),

  new ErrorMessage('minOrderTotal', 'required', 'You must enter a minimum order price'),
  new ErrorMessage('minOrderTotal', 'pattern', 'The minimum order total must be a number.'),
];  
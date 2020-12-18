export default class Chain extends Array
{
  constructor(device)
  {
    super();
    this.device = device;
  }

  /**
   *
   * @returns {Device.Device}
   */
  getDevice()
  {
    return this.device;
  }
}

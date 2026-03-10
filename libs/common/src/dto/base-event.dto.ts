export class BaseEventDto {
  readonly correlationId: string; // Every event MUST have this
  readonly timestamp: Date;
}

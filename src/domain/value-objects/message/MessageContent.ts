import { Result } from '@application/logic/Result';
import { CUSTOM_ERRORS } from '@domain/errors/CustomErrors';
import { ValueObject } from '@domain/primitives/ValueObject';

type MessageContentValue = string;

export class MessageContent extends ValueObject<MessageContentValue> {
  public static readonly maxMessageContentLength = 100;

  private static isValidMessageContent(
    messageContent: MessageContentValue,
  ): boolean {
    if (messageContent.length > MessageContent.maxMessageContentLength) {
      return false;
    }
    return true;
  }

  public static create(value: MessageContentValue): Result<MessageContent> {
    if (!value || !this.isValidMessageContent(value)) {
      return Result.fail({
        code: CUSTOM_ERRORS.USER_INPUT_ERROR,
        msg: `message content must be less than or equal to ${MessageContent.maxMessageContentLength} characters long`,
      });
    }

    return Result.ok<MessageContent>(new MessageContent(value));
  }
}

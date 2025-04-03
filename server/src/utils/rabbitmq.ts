import amqp, { Connection, Channel, Options, Message } from 'amqplib';

type RabbitMQOptions = {
  url?: string;
};

class RabbitMQService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private url: string;

  constructor(options: RabbitMQOptions = {}) {
    this.url = options.url || 'amqp://localhost';
  }

  async connect(): Promise<void> {
    try {
      // @ts-ignore
      this.connection = await amqp.connect(this.url);
      // @ts-ignore
      this.channel = await this.connection?.createChannel?.();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('RabbitMQ Connection Error:', error);
    }
  }

  async assertQueue(queue: string, options: Options.AssertQueue = {}): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized');
    await this.channel.assertQueue(queue, { durable: true, ...options });
  }

  async sendToQueue(queue: string, message: string): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized');
    this.channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  }

  async consume(queue: string, onMessage: (msg: Message | null) => void): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized');
    await this.channel.consume(queue, (msg) => {
      if (msg) {
        onMessage(msg);
        this.channel!.ack(msg);
      }
    }, { noAck: false });
  }

  async deleteQueue(queue: string): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized');
    await this.channel.deleteQueue(queue);
  }

  async close(): Promise<void> {
    try {
      await this.channel?.close();
      // @ts-ignore
      await this.connection?.close();
      console.log('RabbitMQ connection closed');
    } catch (error) {
      console.error('RabbitMQ Close Error:', error);
    }
  }
}

export default RabbitMQService;

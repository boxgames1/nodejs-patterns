## Types of messages

- Command Message: Like command pattern. E.g.: HTTP request
- Event Message: E.g.: domain event
- Document Message: Message doesn't contain information that tells the receiver what to do with the data, by other hand is not associated with a particular occurrence, with something that happened.

## Durable suscribers

A subscriber that is able to always reliably receive all the messages, even those sent whenit's not listening for them, is called a *durable subscriber*.
The MQTT protocol defines a level of Quality of Service (QoS) for themessages exchanged between the sender and receiver:

- QoS0, at most once
- QoS1, at least once
- QoS2, exactly once


## AMQP (Advanced Message Queuing Protocol)

Three essential components:

- Queue: Data structure that can be *durable*, *exclusive* or *auto-delete*
- Exchange: Where the message is published. Implementing algorithms can be *direct exchange*, *topic exchange* or *fanout exchange*
- Binding: This is the link between exchanges and queues. It also defines therouting key or the pattern used to filter the messages that arrive from theexchange

These components are managed by a broker, which exposes an API for creating andmanipulating them.
In AMQP, the durable subscriber pattern can be obtained by creating any type of queue that is not exclusive or auto-delete


## Pipelines and task distribution patterns

The idea is to have a messaging pattern that allows us to spread tasks across multiple machines. These tasks might be individual chunks of work or pieces of a bigger task split using a divide and conquer technique
What we need instead is a message distribution pattern similar to a load balancer, that dispatches each message to a different consumer (also called worker, in this case). In the messaging system terminology, this pattern is known as competing consumers, fanout distribution, or *ventilator*

Here, consumers connect to producer.
Distribution (fan-out or *ventilator*) sends messages through a series of pipelines to be received by an aggregation (fan-in or *sink*)

## Competing consumers pattern

When a broker balances the load of messages received across all the consumers of the key. 

## Return address pattern

The correlation identifier is the fundamental pattern for creating a request/reply communication on top of a one-way channel; however, it's not enough when our messaging architecture has more than one channel or queue, or when there can be potentially more than one requestor. In these situations, in addition to a correlation ID, we also need to know the return address, a piece of information which allows the replier to send the response back to the original sender of the request.

In AMQP, the return address is the queue where the requestor is listening for incoming replies. Because the response is meant to be received by only one requestor, it's important  that the queue is private and not shared across different consumers
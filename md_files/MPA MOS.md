## **MPA MOS**

### **1\. Basic properties and components of the model of queuing system. Kendall classification. Characteristics of M/M/1 and M/M/1/0 systems.**

**Basic Properties and Components of a Queuing System**

A queuing system models the behavior of customers arriving, waiting in a queue, and being served by one or more servers.

**Components:**

* **Arrival Process:** Describes how customers arrive over time, the key property here is arrival rate λ (customers per unit time).  
* **Service Mechanism:** Number of servers, service time distribution, server speed, the key property here is service rate µ (customers served per unit time per server).  
* **Queue Discipline:** This is the waiting space for customers when all servers are busy, it can take a scheduling of FIFO, LIFO, Priority.  
* **Buffer Capacity:** Finite or infinite waiting room.  
* **Population:** Finite or infinite source of customers.

 

**Kendall Classification (A/S/m/B/K/D)**

* Short notation for queuing models: A / S / m / B / K / D

  * **A:** Arrival process distribution (M \= Markovian/Poisson, D \= Deterministic, G \= General).

  * **S:** Service time distribution (M \= Exponential, D \= Deterministic, G \= General).

  * **m:** Number of servers (1, 2, ..., ∞).

  * **B:** System capacity (buffer size \+ servers). Omitted if infinite.

  * **K:** Customer population size. Omitted if infinite.

  * **D:** Queue discipline (FIFO is default, omitted).

**Characteristics:** 

**M/M/1** – Poisson arrivals, exponential service, 1 server, infinite buffer.

**M/M/1/0** – Same but zero buffer (loss system, no waiting). System states in this could be;

State 0: server idle (no customer).

State 1: server busy (one customer being served).

**M/M/c/K** – c servers, finite capacity K.

**M/D/1** – Poisson arrivals, deterministic service time.

 

### **2\. Behavior of ideal and real network. Its reaction to increasing load.**

**Ideal Network**

An ideal network is a theoretical model assuming perfect conditions: infinite buffers, zero processing delay, error-free transmission, and no protocol overhead.

**Key Assumptions**

* Infinite queue capacity at all nodes – no packet loss due to buffer overflow.  
* Instantaneous processing and switching – zero nodal delay.  
* No collisions, no retransmissions, perfect scheduling.  
* No protocol overhead (headers, acknowledgements, control packets).  
* Traffic arrival process well-behaved (e.g., Poisson), service discipline ideal.

**Reaction to Increasing Load**

* Throughput increases linearly with offered load, matching it exactly until capacity limit.  
* At capacity limit, throughput saturates and remains constant at the maximum link rate.  
* No throughput degradation – once maximum is reached, it stays there.  
* No packet loss occurs (infinite buffer holds all excess).

**Real Network**

Real networks have finite resources, protocol overhead, and imperfect mechanisms.

**Realistic Constraints**

* Finite buffers – Packets are dropped when the queue is full. Leads to throughput degradation.  
* Processing, queuing, transmission, propagation delays – all non-zero.  
* Protocol overhead – headers, ACKs, retransmissions (TCP), control messages consume bandwidth.  
* Imperfect scheduling – contention, collisions (CSMA/CD, Wi-Fi), MAC inefficiencies.  
* Flow control & congestion control – TCP window adjustments, slow-start, timeouts.  
* Feedback delays – congestion signals propagate with RTT latency, causing oscillatory reactions.

**Reaction to Increasing Load:**

* Throughput rises sub-linearly.  
* Queues begin building at bottleneck links.  
* Delay increases noticeably.  
* Occasional packet drops trigger TCP backoff; throughput growth slows.

### 

### **3\. Algorithms against network congestion: backpressure, choke packet, implicit and explicit congestion signaling.**

**Backpressure**

This is a reactive, hop-by-hop, node-to-node flow control mechanism acting locally on the direct upstream neighbour.

**Mechanism**

* When a node's buffer fills beyond a threshold, it stops accepting packets from its immediate upstream neighbour.  
* The upstream node, now blocked from forwarding, in turn exerts backpressure on its own upstream neighbour.  
* This backpressure propagates backward along the path toward the traffic source.  
* Effect: the source eventually slows down or stops sending because its immediate downstream node refuses packets.

 

**Choke Packet**

In a choke packet, a direct, explicit feedback packet is sent from the congested node to the traffic source, instructing it to reduce its sending rate.

**Mechanism**

* A congested router detects congestion (e.g., buffer occupancy exceeding threshold, or average queue length increasing).  
* It generates a choke packet addressed directly to the source of the offending traffic.  
* The choke packet identifies the congested entity and requests/imposes a rate reduction.  
* The source reduces its sending rate upon receiving the choke packet.  
* Often, after a timeout without further choke packets, the source gradually increases again.

 

**Implicit Congestion Signaling**

In implicit congestion signaling, congestion is inferred by end hosts from observable network behaviour, without explicit notification from routers.

**Mechanism**

* Source/host deduces congestion by monitoring:  
* Packet loss: packet timeout or duplicate ACK (primary signal in traditional TCP – Reno, CUBIC).  
* Increased delay / RTT variation: increased round-trip time or jitter.  
* No explicit message from network routers.  
* Source adjusts sending rate based on these signals:  
* Loss detected → congestion assumed → reduce window/rate (multiplicative decrease in AIMD).  
* No loss → no congestion → increase window/rate (additive increase).

 

**Explicit Congestion Signaling**

In explicit congestion signaling, routers explicitly mark packets to signal congestion, rather than dropping them. The receiver reflects this to the sender by setting the ECE flag in TCP ACKs. The sender reacts by reducing cwnd (and sets CWR flag). Avoids unnecessary packet loss.

 

### **4\. Data flow control methods at link layer, normalized throughput of individual mechanisms.**

**Principle**

Data flow control controls the rate of frame transmission to prevent a fast sender from overwhelming a slow receiver at the data link layer (hop-by-hop, direct connection).

 

**Mechanisms & Normalized Throughput**

* **Stop-and-Wait:**

This is the simplest mechanism. Sender transmits one frame and waits for acknowledgement before sending the next. 

**Mechanism**

* Sender sends frame, starts timer.  
* Receiver sends ACK upon correct frame receipt.  
* If ACK received before timeout → sender sends next frame.  
* If timeout or NAK → sender retransmits the same frame.  
* Sequence numbers (0/1 alternating) handle duplicate frames from lost ACKs.

* **Sliding Window Flow Control:**

In this flow control, sender may transmit multiple consecutive frames without waiting for individual ACKs, up to a window size W. ACKs are cumulative.

**Mechanism**

* The sender maintains a window of W consecutive sequence numbers.  
* Transmits frames within the window, starts a timer per frame (or per window).  
* Receiver acknowledges correctly received frames.  
* ACK for frame k implicitly acknowledges all frames ≤ k (cumulative ACK).  
* The window slides forward as ACKs arrive.  
* Go-Back-N or Selective Repeat used for error recovery.

**Credit-Based Flow Control:**

In this flow control, the receiver explicitly informs the sender how many frames (or bytes) of buffer space it currently has available. Separate from window size for error control.

**Mechanism**

* Receiver periodically sends a credit value \= number of free buffers.  
* Senders may send data only up to the total outstanding credit granted.  
* Each transmitted frame consumes one credit; each ACK may carry new credit.  
* Protects against buffer overflow regardless of processing speed mismatches.

 

### **5\. Transport protocol TCP: credit allocation mechanism, influence of window size to TCP protocol performance. Optional TCP protocol implementation options: sending, delivery, retransmission accepting, acknowledgement of TCP segments.**

### **Credit Allocation Mechanism (Sliding Window)**

TCP uses a sliding window flow control scheme where the receiver advertises available buffer space (credit) to the sender. This is distinct from the congestion window (cwnd), which controls network congestion.

**Mechanism Details**

* Receiver-advertised window with value specifying how many bytes it is willing to accept.  
* Senders may transmit new data only if the window \> 0\.  
* As the sender transmits, the window shrinks, preventing advertising of tiny windows that lead to small segments..  
* 

**Influence of Window Size on Performance**

The interaction between (receiver window) rwnd (flow control) and cwnd (congestion control) governs throughput, delay, memory usage, and fairness. 

* For small windows, the sender spends significant time idle, waiting for ACKs.

* For small windows, there is under-utilisation of network capacity.

* For large windows, after a loss, large windows take longer to rebuild.

* Large windows permit sending large bursts → increased packet loss probability at bottleneck.

 

**Optional TCP Implementation Options**

TCP specifications define mandatory functions, but various operational details have standardised optional behaviours.

* **Sending Options:** Nagle's Algorithm is utilised to improve network efficiency, it delays small writes until an ACK or full segment is ready, TCP\_CORK proactively bundles data into larger segments, Path MTU Discovery finds the largest safe packet size to avoid fragmentation, and TSO/GSO boosts throughput by shifting segmentation work to the network interface hardware.

* **Delivery Options:** The TCP PSH flag requests immediate data delivery to the application (though receivers may ignore it), while the URG flag marks urgent data via a pointer but is rarely used due to security concerns.

* **Retransmission & Acceptance Options:** TCP retransmission management relies on an RTO, it  ignores RTT samples from retransmitted segments per Karn’s algorithm, applies exponential backoff on repeated retransmissions, uses fast retransmit upon receiving three duplicate ACKs, and leverages SACK and D-SACK to enable selective retransmission and detect spurious timeouts.

### **6\. Self-clocking of TCP. Mechanisms for Round-Trip Time estimation. Slow-start technique.**

**TCP Self-Clocking (ACK Clocking)**

TCP Self Clocking is a fundamental property of TCP where the arrival of acknowledgements (ACKs) clocks out new data segments, automatically pacing the sender to the network's bottleneck rate.

**Principle**

* Sender injects data segments into the network.  
* These segments traverse the path and arrive at the receiver.  
* Receiver generates ACKs in response.  
* ACKs return to the sender, effectively spaced out by the bottleneck link's service rate.  
* Sender transmits new segments only upon ACK arrival.  
* This creates a natural closed-loop feedback system where the returning ACK stream mirrors the bottleneck's capacity.

**Round-Trip Time (RTT) Estimation Mechanisms**

Accurate RTT estimation is critical for setting the Retransmission Timeout (RTO). In this case, TCP uses adaptive smoothing and variance tracking.

 

**Slow-Start Technique**

This is a TCP congestion control phase that probes for available bandwidth by exponentially increasing the congestion window (cwnd) from an initial small value.

**Purpose**

* **Probe the network:** TCP has no prior knowledge of available bandwidth when a connection starts or after a long idle/RTO.  
* **Avoid overwhelming the network:** start with a small cwnd and expand rapidly but safely.  
* **Goal:** quickly reach the available capacity without causing congestion collapse.

### 

### 

### **7\. Sliding window management in TCP: Dynamic Window Sizing on Congestion; Fast retransmit; Fast recovery**

**Dynamic Window Sizing on Congestion (Congestion Control)**

In dynamic Window Sizing, TCP dynamically adjusts the congestion window (cwnd) based on observed network conditions to maximise throughput while avoiding congestion collapse.

The **cwnd** is dynamically adjusted:

* **Slow Start:** Until ssthresh, exponential (cwnd \= cwnd \+ 1 MSS per ACK).  
* **Congestion Avoidance:** Once cwnd \>= ssthresh, cwnd \+= MSS \* (MSS / cwnd) per arriving non-duplicate ACK (linear increase, roughly \+1 MSS per RTT).  
* **On Timeout (Loss):** ssthresh \= max(2 \* MSS, cwnd/2), cwnd \= 1 MSS. Enter Slow Start.  
* **AIMD** (Additive Increase Multiplicative Decrease) principle.

 

**Fast Retransmit (TCP Reno)**

This is a mechanism to detect and retransmit a lost segment without waiting for the RTO timer to expire, triggered by duplicate ACKs.

* Sender infers a packet loss from the arrival of **three duplicate ACKs** (each ACK has the same sequence number, implying the expected next packet is missing).

* The sender **immediately retransmits** the missing segment, without waiting for the retransmission timer (RTO) to expire.

* **Trigger:** 3 DupACKs. Much faster than waiting for a timeout.

 

**Fast Recovery (TCP Reno)**

This is a complementary mechanism to Fast Retransmit; it avoids dropping cwnd back to initial window and re-entering slow-start after a fast retransmit.

* After Fast Retransmit, instead of dropping cwnd to 1 MSS and entering slow-start (like TCP Tahoe), TCP Reno performs Fast Recovery:

1\. ssthresh \= cwnd / 2.

2\. cwnd \= ssthresh \+ 3\*MSS (accounts for the three dupACKs that have already left the network).

3\. For each additional duplicate ACK, cwnd \+= MSS (inflating cwnd to keep packets in flight).

4\. When the ACK for the retransmitted packet arrives, cwnd \= ssthresh, and enter Congestion Avoidance mode.

* Prevents a performance collapse from a single isolated loss, keeping the pipe full without needing the overhead of restarting from slow start.

 

### 

### 

### 

### 

### **8\. Mechanisms preventing congestion: Random Early Detection (RED) a Weighted Random Early Detection (WRED), Explicit Congestion Notification (ECN)**

**RED (Random Early Detection)**

This is an active queue management (AQM) algorithm running in routers. Instead of waiting for the buffer to overflow (tail drop), it **pro-actively drops packets** before the queue is full.

* RED computes an **Exponentially Weighted Moving Average (EWMA)** of the queue length and randomly drops arriving packets with a probability P proportional to avg. 

P \= max\_P \* (avg \- min\_th) / (max\_th \- min\_th).

avg \> max\_th: Drop all packets (tail drop).

* **Goal:** The goal is to avoid global synchronization (when multiple TCP flows simultaneously experience tail-drop, halve their windows, and then all re-open at the same time, causing oscillating congestion).

* **Effect:** Keeps queue sizes and delays low, eliminates systemic bias against bursty traffic.

 

**WRED (Weighted Random Early Detection)**

This is an extension of **RED** that supports **differentiated drop thresholds** based on IP Precedence (ToS) or DSCP markings.

* With **WRED**, higher-priority traffic gets a larger min\_th (or higher max\_th), making it less likely to be dropped during incipient congestion. Low-priority traffic gets dropped more aggressively.

* It enables basic class-based QoS via preferential packet discard.

 

**ECN (Explicit Congestion Notification) – (in this context, AQM side)**

This works in tandem with **RED**. Instead of dropping a packet, **RED** can set the **Congestion Experienced (CE)** bits in the IP header (two bits of the DSCP/ECN field) if both endpoints are ECN-capable.

The TCP receiver echoes the congestion back to the sender by setting the **ECE (ECN-Echo)** flag in the ACK. The sender reacts by halving cwnd (as if a drop occurred) but without packet loss. Reduces retransmission delay, good for latency-sensitive flows.

 

### **9\. Quality of Service in data networks; Supervision of network traffic; Packet classification; Packet scheduling**

QoS refers to the capability of a network to provide differentiated service levels to different traffic types, applications, or users according to their requirements.

**Key QoS Parameters**

* Bandwidth / Throughput: minimum guaranteed or peak rate.  
* Latency (Delay): end-to-end packet delivery time.  
* Jitter (Delay Variation): variability in packet inter-arrival times.  
* Packet Loss Rate: percentage of packets not delivered.  
* Availability: percentage of time the service is operational

**Supervision of Network Traffic (Traffic Conditioning)**

Traffic supervision enforces the traffic contract (SLA) by monitoring and acting on traffic that conforms to or violates the agreed profile.

Operations applied to packet streams at the edge of a QoS domain:

* **Classification:** Examine packet header (L2, L3, L4 info) and assign to a traffic class. (e.g., using DSCP or 802.1p).  
* **Metering:** Measure the arrival rate of the flow against a predefined profile (e.g., a token bucket with CIR – Committed Information Rate, and PIR – Peak Information Rate).  
* **Marking / Re-marking:** Setting the DSCP, MPLS EXP, or 802.1p PCP field to indicate the packet's service level.  
* **Traffic Policing:** Strictly limiting a flow to its profile. Exceeding packets are dropped or marked down. 

 

**Packet Classification**

This is the process of identifying packets and assigning them to specific traffic classes (forwarding equivalence classes) for differentiated treatment. Classification can be

* **Simple Classification:** Based on a single field (DSCP, CoS).

* **Multi-Field Classification:** Inspecting L2-L4 headers (source/dest MAC, IP, Port, Protocol). Used in firewalls and edge routers. BAC (Behavior Aggregate) vs. MF (Multi-Field) classifiers.

 

**Packet Scheduling**

Packet scheduling determines the order in which queued packets are transmitted on an output link, allocating bandwidth and controlling latency among traffic classes. These can be

* **FIFO (First-In, First-Out):** No QoS. Single queue, transmits in order of arrival.

* **Priority Queuing (PQ):** Multiple priority levels with strict scheduling. High-priority queue are always serviced first; lower queues starve if HP traffic is high.

* **Fair Queuing (FQ) / Weighted Fair Queuing (WFQ):** Emulates bit-by-bit round-robin. Each flow gets a fair share. WFQ weights the shares based on IP precedence/DSCP. Prevents a greedy flow from starving others.

* **Class-Based Weighted Fair Queuing (CBWFQ):** Each traffic class is assigned a minimum guaranteed weight (bandwidth percentage). Scheduler allocates bandwidth proportionally during congestion. Provides fair allocation without starvation; excess bandwidth is shared among active classes.


### **10\. Quality of Service in wireless networks IEEE802.11. Methods for media access control, their extension according to 802.11e \- Extended distributed channel access (EDCA), HCF-controlled channel access (HCCA).**

### The original IEEE 802.11 introduces the Hybrid Coordination Function (HCF) to provide QoS. It defines two access methods:

**Enhanced Distributed Channel Access (EDCA)**

EDCA is an enhanced version of the legacy DCF mechanism, providing prioritised, distributed medium access. In EDCA, traffic is differentiated using four Access Categories, each with its own queue and channel access parameters. User Priority (UP) from upper layers maps to an AC.

**Access Mechanism**

* Station with frame to send senses to the medium.  
* Waits for the medium to be idle for its AC-specific AIFS period.  
* Generates a random backoff number within its CW range.  
* Decrements backoff counter while medium is idle; transmits when counter reaches zero.  
* if two ACs within the same station finish backoff simultaneously, the higher-priority AC transmits. The lower-priority AC behaves as if an external collision occurred (increases CW, retries)


**HCF Controlled Channel Access (HCCA)**

HCCA is an extension of the legacy PCF mechanism, providing centralised, parameterised QoS through polling. The Hybrid Coordinator (HC), typically integrated into the Access Point (AP), has absolute control over the wireless medium

**HCCA Mechanism**

* Traffic Specification (TSPEC): Stations request QoS reservations by sending a TSPEC to the HC, detailing data rate, packet size, delay, and service interval requirements.  
* Admission Control: The HC accepts or rejects the request based on available resources.  
* The HC schedules Transmission Opportunities (TXOPs) and polls stations according to a calculated schedule, granting them contention-free access.  
* Because the HC controls all transmissions, collisions are effectively eliminated during the controlled access phases


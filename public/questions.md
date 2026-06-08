
## **MPA KPM**

### **1\. 4G Cellular Systems: Modulation schemes for LTE (OFDM, OFDMA, SC-FDMA), error-control methods (ARQ/HARQ).**

**Modulation Schemes**

* **OFDM (Orthogonal Frequency Division Multiplexing Orthogonal Frequency Division MultiplexingOrthogonal Frequency Division Multiplexing):**

  * A multi-carrier modulation technique. Splits a high-rate data stream into many parallel low-rate streams, each modulating a subcarrier. Subcarriers are spaced to be “orthogonal” (spectrally efficient, no guard bands needed). Used in LTE **downlink**.

  * *Key term: Orthogonality* – The peak of one subcarrier aligns with the nulls of others, eliminating interference despite overlap.

* **OFDMA (Orthogonal Frequency Division Multiple Access):**

  * The multiple access version of OFDM. Different users are assigned different subsets of 15 subcarriers (Resource Blocks). It is robust because it takes advantage of the time and frequency domain. It is used in LTE **downlink**.

* **SC-FDMA (Single Carrier Frequency Division Multiple Access):**

  * Used in LTE **uplink**. A pre-coded version of OFDMA. The data symbols are first spread via a Discrete Fourier Transform (DFT) before mapping to subcarriers (as in OFDM). This results in a single-carrier-like transmission.

  * *Why uplink?* Has a much lower **Peak-to-Average Power Ratio (PAPR)** than OFDMA, saving battery life in the User Equipment (UE).

 

**Error-Control Methods**

* **ARQ (Automatic Repeat reQuest):**

  * An error-control method at the data link layer. The receiver detects errors (using CRC) and requests retransmission of corrupted packets. If the sender doesn’t get an ACK, it resends after a timeout. Pure ARQ discards errored packets.

  * *Location:* LTE RLC (Radio Link Control) layer in Acknowledged Mode (AM).

* **HARQ (Hybrid ARQ):**

  * A combination of FEC (Forward Error Correction) and ARQ. The receiver first tries to correct errors using FEC codes. If it fails, it stores the corrupted packet in a soft buffer and requests a retransmission. The retransmission is combined with the original (Chase Combining or Incremental Redundancy) to increase the chance of correct decoding.

  * *Location:* LTE MAC layer. Is a key enabler for fast retransmissions and low latency. Uses N-process Stop-and-Wait protocol.


### **2\. 4G cellular Systems: IP-based architecture (E-UTRAN, EPS vs. EPC), LTE Radio Resource Grid (frame structure, slot structure). Utilization of the frequency spectrum, physical layer (physical channels, transport channels).**

**IP-Based Architecture**

* **EPS (Evolved Packet System):** The entire end-to-end system \= **E-UTRAN** \+ **EPC** \+ UE.

* **E-UTRAN (Evolved Universal Terrestrial Radio Access Network):**

  * The radio access network. Consists entirely of **eNodeBs (eNBs)** .

  * *Key feature: A flat architecture.* eNBs connect directly to each other via the **X2 interface** and to the EPC via the **S1 interface**. No centralizing RNC (like in 3G).

* **EPC (Evolved Packet Core):**

  * The all-IP core network. Main nodes:

    * **MME (Mobility Management Entity):** Control plane node. Handles signaling, authentication, mobility, and bearer management. (Talks to eNB on S1-MME).

    * **S-GW (Serving Gateway):** User plane anchor for intra-LTE mobility. Routes and forwards user data packets. (Talks to eNB on S1-U).

    * **P-GW (PDN Gateway):** The interface to external packet data networks (Internet, IMS). Allocates UE IP address, handles QoS enforcement, and deep packet inspection.

 

**LTE Radio Resource Grid**

* **Frame Structure:** Both FDD and TDD frames are 10 ms long.

  * **FDD:** 10 subframes (each 1 ms). Each subframe has 2 slots (0.5 ms each). Downlink and Uplink are on separate frequencies.

  * **TDD:** A 10 ms frame has 2 half-frames (5 ms). Each half-frame has subframes configurable for DL, UL, or special subframes.

* **Slot Structure & Resource Grid:**

  * A **slot** (0.5 ms) in the time domain and a set of subcarriers in the frequency domain.

  * Normal Cyclic Prefix: 7 OFDM symbols per slot.

  * **Resource Element (RE):** The smallest physical resource. One OFDM symbol on one subcarrier.

  * **Resource Block (RB):** The basic unit for scheduling. 12 consecutive subcarriers (180 kHz) in frequency and 1 slot (0.5 ms) in time.

  * A **Resource Block Pair** is 2 RBs over one subframe (1 ms) and is the standard scheduling interval for a user.

**Physical Layer: Channels**

* **Physical Channels:** Actual time-frequency resources conveying bits over the air interface.

  * **PDSCH (Physical Downlink Shared Channel):** Main workhorse for user data.

  * **PDCCH (Physical Downlink Control Channel):** Carries Downlink Control Information (DCI), like resource assignments for PDSCH and PUSCH.

  * **PUSCH (Physical Uplink Shared Channel):** Uplink user data.

  * **PRACH (Physical Random Access Channel):** For initial access.

* **Transport Channels:** How data is passed between MAC and Physical layer. Defines *how* data is transmitted over the radio link.

  * **DL-SCH (Downlink Shared Channel):** The main transport channel for PDSCH. Supports AMC, HARQ, MIMO.

  * **BCH (Broadcast Channel):** For MIB on PBCH.

  * **RACH (Random Access Channel):** For PRACH.

* **Logical Channels:** *What* type of data is carried (e.g., BCCH for broadcast control, CCCH for common control, DTCH for dedicated user traffic). Mapped by the MAC layer onto transport ch annels.

 

### **3\. 4G Cellular Systems: Key blocks within the communication infrastructure (RAN, EPC), EPS communication levels with UE (AS, NAS). EPS bearers, protocol architecture (control plane, user plane X2 interface), EPC tracking area update procedure.**

**Communication Levels with UE**

* **AS (Access Stratum):** All protocols and functions between the UE and the eNB, responsible for radio access. Includes RRC, PDCP, RLC, MAC, and PHY.

* **NAS (Non-Access Stratum):** Protocols and functions between the UE and the MME (control plane) and UE and S-GW/P-GW (user plane, though user plane is often considered part of EPS bearer context). NAS is transparent to the eNB. Handles EMM (Mobility) and ESM (Session Management).

 

**EPS Bearers**

* A logical connection from the UE to the P-GW providing a specific QoS treatment. It’s a concatenation of:

  * Radio Bearer (UE – eNB)

  * S1 Bearer (eNB – S-GW)

  * S5/S8 Bearer (S-GW – P-GW)

* **Default Bearer:** Established at attach, provides always-on IP connectivity. Gets one IP address. Non-GBR.

* **Dedicated Bearer:** Established later on-demand for specific services (e.g., VoLTE). Can be GBR or non-GBR.

**Protocol Architecture (Control & User Plane)**

* **User Plane (Data):** PDCP \-\> RLC \-\> MAC \-\> PHY at eNB. Data flows UE \-\> eNB \-\> S-GW \-\> P-GW.

* **Control Plane (Signaling):** RRC (UE-eNB) and NAS (UE-MME). The protocol stack includes RRC, which uses PDCP/RLC/MAC/PHY.

* **X2 Interface:** Direct interface between eNBs. User plane uses GTP-U (tunneling protocol for data forwarding during handover). Control plane uses X2-AP (for handover signaling, load management).

 

**Tracking Area Update (TAU) Procedure**

Tracking Areas (TAs) are groups of cells. The MME tracks the UE’s location at TA level when in IDLE mode. When the UE moves to a new TA not in its list, it initiates a TAU Request (a NAS message on the CCCH). The MME updates its context and may reallocate a new temporary identity (GUTI).

 

### **4\. 5G Targets, Opportunities & Challenges (ITU-R IMT-2020)**

* **ITU-R IMT-2020 Vision:** Defines 5G’s key capabilities.

* **Three Main Use Cases (eMBB, mMTC, URLLC):**

  * **eMBB (Enhanced Mobile Broadband):** Extreme data rates, capacity; evolution of 4G.

  * **mMTC (Massive Machine-Type Communications):** Massive number of low-power, low-cost devices (IoT).

  * **URLLC (Ultra-Reliable Low-Latency Communications):** Sub-1ms latency, extremely high reliability (e.g., V2X, industrial automation).

* **Key Targets:**

  * Peak Data Rate: 20 Gbps DL / 10 Gbps UL.

  * Latency: 1 ms over the air for URLLC.

  * Connection Density: 1 million devices/km².

  * Spectrum Efficiency: 3x 4G.

  * Energy Efficiency: 100x 4G.

* **Challenges:** High-frequency propagation, network densification cost, energy consumption, security in sliced/ virtualized networks.

 

### **5\. 5G Cellular Systems: Frequency spectrum, Radio propagation, and Technical enablers. Network densifications.**

* **Frequency Spectrum (FR1 & FR2):**

5G New Radio (NR) operates across two broad Frequency Ranges (FR) defined by 3GPP to balance coverage and capacity

* **FR1 (Sub-7 GHz, usually sub-6):** This foundational band spans from 410 MHz to 7.125 MHz . It provides wide area coverage and reliable signal penetration through obstacles, forming the primary deployment spectrum . It is commonly referred to as the Sub-6 GHz band.  
* **FR2 (mmWave, 24.25 – 52.6 GHz):** Operating from 24.25 GHz to 71 GHz, this band is synonymous with millimeter wave . It delivers extreme capacity and multi-Gbps peak speeds due to the large available bandwidths

**Radio Propagation (mmWave):** Radio propagation characteristics are highly dependent on the frequency band

**Technical Enablers:**

To meet IMT-2020 requirements, 5G integrates several key physical layer technologies that overcome propagation challenges

* **Massive MIMO:** This cornerstone technology uses a very large number of antennas at the base station to focus signals into narrow, powerful beams toward specific users (beamforming) and transmit multiple data streams simultaneously, dramatically improving spectral efficiency and cell capacity.  
* **Carrier Aggregation:** This technique combines multiple separate frequency blocks to create a wider effective channel bandwidth for a single user, boosting data rate and capacity.  
* **Network Adaptability:** 5G continuously adapts its transmissions using adaptive modulation and coding schemes, adjusting data rates based on real-time channel conditions and link quality

### **6\. 5G cellular systems: Ultra-reliable and low latency communications.**

Ultra-Reliable and Low Latency Communications (URLLC) is one of the three core service categories for 5G defined by ITU-R IMT-2020, alongside eMBB and mMTC . It is designed to deliver data with extremely high reliability and minimal delay for mission-critical services.

* **Target:** 1 ms user-plane latency with 99.999% reliability for 32-byte packet transmission.

* **Enablers for Low Latency:**

  * **Mini-slot Transmission:** Scheduling can start at any OFDM symbol, not just slot boundaries.

  * **Self-Contained Slot Structure:** A slot contains both DL, UL, and ACK/NACK within itself.

  * **Pre-emption:** URLLC data can puncture an ongoing eMBB transmission.

* **Enablers for High Reliability:**

  * **PDCP Duplication:** The same data is transmitted over two independent paths (e.g., on different frequencies) for diversity.

  * **Robust CQI/MCS Tables:** Very low BLER targets (e.g., 10^-5 instead of 10^-1).

  * **Grant-Free Uplink (Configured Grant):** The UE can transmit without waiting for an UL grant, removing scheduling request delay.

 

 

### **7\. 5G Architecture (Reference Point Representation)**

Reference point representation describes 5G architecture using point-to-point interfaces between network functions.

**Key Entities:**

* **gNB (Next Generation Node B):** The 5G base station. Connects to UE via NR Uu, to other gNBs via **Xn** interface.  
* **AMF (Access and Mobility Management Function):** NAS signaling termination, registration, mobility management (successor to MME).  
* **SMF (Session Management Function):** UE IP allocation, session establishment, QoS flow management.  
* **UPF (User Plane Function):** Data plane anchor (successor to S-GW/P-GW). Routes packets, enforces QoS.  
* **UDM (Unified Data Management), PCF (Policy Control Function), NRF (Network Repository Function):** Service-based architecture elements. 

### **8\. 5G Cellular Systems: Network function virtualization (NFV), network slicing.**

**NFV (Network Function Virtualization):**

Network Function Virtualization decouples network functions (e.g., AMF, SMF, UPF) from proprietary hardware appliances. It runs them as software on commercial-off-the-shelf (COTS) servers using virtualization tech (VMs/containers).

**Advantages:** Agility, scalability, reduced time-to-market for new services, Capex/Opex reduction.

**Network Slicing:**

Network Slicing is a logical, end-to-end network instance tailored to a specific service (e.g., an eMBB slice, a URLLC slice, a mMTC slice). Each slice is an independent virtual network with its own dedicated/ shared NFs, resources, and topology, all running on a common physical infrastructure.

**Advantages:** 

* Flexibility – instant deployment, scaling, and relocation of functions.  
* Cost reduction – no vendor lock-in, common hardware.  
* Agility – rapid service rollout and updates.  
* Enables dynamic resource allocation per slice.

 

### **9\. 5G Cellular Systems: User plane, Control plane, Protocol architecture, Message flows.**

**User Plane:** User plane is for end-to-end user data transfer. Its layers are 

UE \<-\> gNB (NR Uu) \<-\> UPF (N3 tunnel) \<-\> Data Network (N6). 

**Control Plane:** Control  plane is for signalling, session management, mobility, authentication. Its layers are UE \<-\> gNB (RRC) and UE \<-\> AMF (NAS).

NAS messages are relayed by the gNB transparently over N2.

**Key Message Flows:**

* **Registration Procedure:** UE sends Registration Request (NAS). After authentication/security with AMF/UDM, the AMF performs registration accept, sending UE policy and allowed NSSAIs (slices).  
* **PDU Session Establishment:** UE sends a NAS Session Establishment Request to AMF. AMF selects SMF. SMF selects UPF, establishes the N4 session, and coordinates N3 tunnel setup with the gNB. UE gets IP allocation at the end.  
* **Service Request:** UE transitions from CM-IDLE to CM-CONNECTED to send data. Involves RRC setup and NAS Service Request, reconnecting the N3 tunnel.

 

### **10\. 5G cellular systems: Radio resource control (RRC), Service data adaptation protocol (SDAP), Packet data convergence protocol (PDCP).**

### **Radio Resource Control (RRC)**

The RRC layer operates strictly within the **Control Plane** (Layer 3) and acts as the master controller for the radio interface between the User Equipment (UE) and the 5G base station (gNB). It is responsible for configuring and managing the lower layers of the protocol stack.

* **Connection Management:** Handles the establishment, maintenance, and release of RRC connections.
* **System Information:** Broadcasts essential network parameters and system information blocks (SIBs) to all devices in a cell.
* **Mobility:** Manages cell selection, reselection, and handovers as a device moves through the network.
* **Measurement:** Configures how and when the UE should measure signal strength and report it back to the network to assist with mobility decisions.

---

### **Service Data Adaptation Protocol (SDAP)**

SDAP is a new protocol layer introduced specifically for 5G, operating in the **User Plane** (Layer 2). Its primary purpose is to handle the more granular Quality of Service (QoS) framework required by 5G networks compared to 4G LTE.

* **QoS Mapping:** Maps individual QoS flows (originating from the 5G Core Network) to specific Data Radio Bearers (DRBs) over the air interface.
* **Packet Marking:** Marks packets with a QoS Flow ID (QFI) in both the uplink (device to network) and downlink (network to device) directions.
* **Dynamic Handling:** Allows the network to dynamically assign and switch radio resources based on the specific latency, reliability, or bandwidth requirements of different applications (e.g., separating standard internet traffic from critical IoT data).

---

### **Packet Data Convergence Protocol (PDCP)**

The PDCP layer operates in both the **Control Plane** and **User Plane** (Layer 2) and is primarily focused on optimizing and securing the data payloads before they are transmitted over the physical radio waves.

* **Header Compression:** Uses the Robust Header Compression (ROHC) protocol to compress IP headers, drastically reducing overhead and improving spectral efficiency.
* **Security:** Handles ciphering (encryption) and deciphering of user data and control messages to prevent eavesdropping. It also provides integrity protection to ensure data has not been tampered with.
* **Packet Ordering:** Assigns sequence numbers to packets, ensuring in-sequence delivery to higher layers, reordering out-of-order packets, and discarding duplicates (which is especially critical during cell handovers).


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



## **MPA MUM**

### **1\. Multimedia and its parameters, colour models, sampling, basic image formats, image properties (statistical and psychovisual redundancy).**

**Multimedia Parameters**

Multimedia refers to the integrated presentation of text, graphics, audio, images, animation, and video, typically in digital form.

**Key Multimedia Parameters**

**Spatial Resolution**: This is the number of pixels per image.

**Temporal Resolution:** These are frames per second.

**Colour Depth / Bit Depth:** These are the number of bits used per pixel to represent colour. 

**Dynamic Range:** This is the ratio between maximum and minimum representable intensity. HDR (High Dynamic Range) extends beyond standard range.

**Bit Rate:** This is the amount of data per unit time (bps). Key quality/compression tradeoff metric for streaming media.

**Colour Models**

These are mathematical models representing colours as tuples of component values.

* **RGB (Red, Green, Blue):** Additive model for displays. Each pixel has three components. Used in monitors, cameras, scanners, image/video processing.

* **YCbCr (Luminance & Chrominance):** Used in compression.

  * **Y (Luma):** Brightness (grayscale).

  * **Cb, Cr (Chroma):** Color difference signals (Blue-difference, Red-difference).

Reason for use: Human eye is less sensitive to chrominance detail → **Chroma Subsampling** saves bandwidth.

* **CMYK (Cyan, Magenta, Yellow, Key/Black):** Subtractive model for printing.

* **HSV / HSB (Hue, Saturation, Value/Brightness):** This is an intuitive model based on human colour perception.

 

**Sampling & Chroma Subsampling**

Sampling is the conversion of a continuous image/signal into a discrete digital representation. It can be divided into Spatial Sampling and Chroma Sampling

* **Spatial Sampling:** This is dividing the continuous image plane into a grid of pixels. The sampling rate determines the spatial resolution.

* **Chroma Sampling:** This is the reducing the resolution of chrominance (Cb, Cr) channels relative to luminance (Y) to reduce data volume without severe perceptual degradation.

**Notation (J🅰️b)**

J: This is the horizontal reference block width (usually 4 pixels).

a: Number of chroma samples in the first row of J pixels.

b: Number of chroma samples in second row (often same as a).

* **4:4:4:** No subsampling (every pixel has its own Cb, Cr). Highest quality.

  * **4:2:2:** Horizontal subsampling by 2 (Cb/Cr shared by 2 horizontal pixels). Broadcast standard.

  * **4:2:0:** Horizontal and vertical subsampling by 2 (Cb/Cr shared by a 2x2 block). Most common for distribution (DVD, Blu-ray, streaming, JPEG).

 

**Basic Image Formats**

* **JPEG:** Lossy, DCT-based. Best for photographs. 24-bit color.

* **PNG:** Lossless, DEFLATE/LZ77-based. Supports transparency (Alpha channel). Best for graphics, text, images needing perfect preservation.

* **GIF:** Lossless, 8-bit palette (256 colors), supports animation.

* **BMP:** Uncompressed, simple raster format.

* **TIFF:** Flexible container, can be lossy or lossless.

 

**Image Redundancy**

Redundancy in image data is exploited for compression. Three main types:

* **Statistical Redundancy:** In statistical redundancy, there is an unequal probability distribution of pixel values. Some intensity/colour values occur more frequently than others. It is utilised in lossless compression by removing statistical redundancy.

* **Spatial Redundancy:** In spatial redundancy, neighbouring pixels are typically highly correlated and adjacent pixels can be predicted from neighbours.

* **Psychovisual Redundancy:** Due to the human visual system (HVS) being less sensitive to certain image components, psychovisual redundancy exploits this by removing this information imperceptible to the human eye.

 

### **2\. Predictive coding and scalar quantization (linear, non-linear), vector quantization.**

**Predictive Coding**

Predictive coding is a compression technique that exploits spatial or temporal correlation by encoding the difference (prediction error) between the actual sample value and its predicted value. In predictive coding, instead of encoding original sample values directly, the prediction residual (error) is encoded

Types of predictive coding are;

- Spatial prediction  
- Temporal prediction  
- Adaptive prediction

Predictive coding is applied in lossless compression, speech coding, video coding and audio coding.

 

**Scalar Quantization**

Scalar quantization is the process of mapping a continuous or high-precision input value to a finite set of discrete output levels (reconstruction values). Each sample is quantised independently. It is divided into linear and non linear quantization

- **Linear Quantization:** For linear quantization, decision intervals are equal in size with reconstruction levels at midpoints of these intervals. Linear quantization is simple and easier to implement.  
- **Non Linear Quantization:** In non linear quantization, the decision intervals and reconstruction levels are not uniformly spaced. Its goal is to minimize overall distortion for a given number of levels.

 

**Vector Quantization (VQ)**

In vector quantization, instead of quantizing each scalar sample independently, they are jointly quantized in groups in an N-dimensional vector and then the whole vector is replaced with an index to a pre-designed **codebook** of representative vectors. Vector quantization requires exhaustive search in the codebook (computationally heavy) during encoding but decoding is usually trivial.

 

### **3\. Methods used for motion estimation and compensation in video and their principles (FULL SEARCH, THREE STEP SEARCH, LOGARITHMIC SEARCH), subpixel precision in search.**

**Motion Estimation & Compensation:**

Motion estimation exploits **temporal redundancy** between successive video frames. Instead of encoding every frame independently (**I-frame**), find matching blocks in a reference frame (past or future) and encode only the **Motion Vector (MV)** and the **prediction residual** (difference block).

**Principle**

Frame divided into macroblocks (e.g., 16x16 pixels). For each block, the encoder searches for the best matching block in the reference frame within a predefined search window.

**Search Algorithms**

* **Full Search (Exhaustive Search):** Full search evaluates every possible candidate block position within the search window while taking the optimal result. It is extremely computationally expensive with a complexity O(N²) per block. 

* **Three Step Search (TSS):** Three step search is a fast, sub-optimal algorithm utilizing a logarithmic approach. It starts from the center (0,0). Evaluate 9 points and move the center to the best match. 

* **Logarithmic Search (Log Search / 2D Log Search):** This is similar to TSS but it uses a cross-shaped search pattern at each iteration. It halves step size until step \= 1, then does a final full search of the 8 neighbors. Better for tracking small motion.

### **4\. Entropic coding (arithmetic, LZW, Huffman) principles and their use in image and video compression.**

Entropic coding is a lossless compression technique that assigns shorter codewords to more frequent symbols and longer codewords to less frequent ones.What is hu

 

**Huffman Coding**

This is a lossless data compression algorithm. The idea in Huffman coding is to assign variable length codes to input characters, the lengths of these codes are based on the frequencies of the characters. The greedy idea is to assign the least code to the most frequent character. It works by building a binary tree by repeatedly merging the two nodes with the lowest probabilities. The path from root to leaf gives the codeword. Multimedia codecs like JPEG, PNG, and MP3 use Huffman encoding.

 

**Arithmetic Coding**

Arithmetic coding works by encoding an entire message as a single number in the interval \[0, 1). The interval is recursively partitioned based on cumulative symbol probabilities. The final interval uniquely represents the entire sequence. Arithmetic coding can achieve rates closer to entropy than Huffman. Because of its high performance, arithmetic coding is a foundational engine for many modern file formats.

 

**LZW (Lempel-Ziv-Welch) Coding**

LZW is a dictionary-based compression algorithm. It builds a dictionary of strings dynamically from the input data stream. New strings are formed by appending a character to an existing string already in the dictionary. It is used in GIF, early TIFF compression. It works well for data with repeating patterns and there is no need to transmit a codebook; the decoder reconstructs the dictionary on the fly from the stream.

 

### **5\. Image data transforms (DCT, DWT, WHT) \- basic principle and their use in image and video compression.**

Transform coding converts image data from the spatial domain to a frequency domain representation. The goal is **energy compaction**: most signal energy is packed into a few low-order transform coefficients. Other coefficients can be coarsely quantized or discarded.

**DCT (Discrete Cosine Transform)**

This is a mathematical technique used in digital signal and image processing to convert data from the spatial domain into a sum of cosine functions oscillating at different frequencies. It is the core algorithm enabling lossy compression formats like JPEG, MP3, and HEVC

**Principle:**

* It converts blocks of pixels into sums of cosine functions at increasing frequencies.

* For typical images, DC and low-frequency AC coefficients contain almost all visual information.

* It is block-based (8×8 typically)

* It is used in 

- JPEG (2D-DCT on 8x8),   
- MPEG,   
- H.264 

 

**DWT (Discrete Wavelet Transform)**

This is a mathematical technique used in signal and image processing to analyze data at multiple resolutions.

**Principle:**

* Images are filtered into subbands: Low-Pass approximation (LL) and High-Pass details in horizontal (HL), vertical (LH), and diagonal (HH) directions.

* The LL subband is recursively decomposed (e.g., 3 to 5 levels in JPEG 2000).

* **Advantage over DCT:** No blocking artifacts; instead, artifacts manifest as blurring or ringing near sharp edges. Better compression efficiency at low bitrates.

* **Use:** JPEG 2000, image archival, digital cinema.

 

**WHT (Walsh-Hadamard Transform)**

This uses Walsh functions, which are square waves taking only values ±1. The transform involves only additions and subtractions (no multiplications), making it extremely fast.

* **Energy Compaction:** Poor compared to DCT. Not used for high-compression coding.

* **Use:** Historically in H.264 for **intra prediction** mode decision on 4x4 residual blocks before transform coding.

 

### **6\. What are SPIHT and EZW methods used for in image or video compression, describe their principle.**

**SPIHT and EZW** are wavelet-based **embedded coding** algorithms, primarily used for image compression (and later extended to video). An embedded code produces a bitstream that can be truncated at any point and still decode a lower-quality version of the image. Progressive by nature.

 

**EZW (Embedded Zerotree Wavelet coding)**

* Introduces the **zerotree** concept. When a wavelet coefficient at a coarse scale is insignificant (below a threshold), its children at the next finer scale in the same spatial orientation are also *very likely* to be insignificant.

* A zerotree symbol efficiently represents an entire spatial quadtree of insignificant coefficients with a single codebook entry. Greatly reduces the number of symbols to encode.

* **Process:** Multiple passes (dominant pass for significance, subordinate pass for precision) iteratively decreasing a threshold (bit-plane encoding).

 

**SPIHT (Set Partitioning In Hierarchical Trees)**

This is an improved, and more efficient successor to EZW.

* It organizes coefficients into **Spatial Orientation Trees** (hierarchical parent-child relationships across wavelet scales). Uses three lists: **LSP** (List of Significant Pixels), **LIP** (List of Insignificant Pixels), **LIS** (List of Insignificant Sets).

* It uses highly efficient set partitioning rules (Type A/D sets) that test groups of pixels for significance with a single bit.

* **Properties:** It is fully embedded, with need for no training or codebook, computationally simple (just comparisons), and yields excellent rate-distortion performance.

* **Use:** Efficient wavelet-based image compression; benchmark for progressive transmission applications.

 

### **7\. Security of image data by watermarking \- principles, techniques.**

**Principles**

Digital watermarking is the process of imperceptibly embedding a secret payload (watermark) directly into multimedia data for purposes like copyright protection, content authentication, tamper detection, and broadcast monitoring.

* **Imperceptibility:** The watermark must not visibly degrade the image/video quality.

* **Robustness:** Watermark must survive common signal processing (compression, filtering, scaling, cropping) and/or malicious attacks (StirMark).

* **Capacity (Payload):** Amount of data that can be embedded.

* **Security:** Watermark undetectable without a secret key (even if the algorithm is known, per Kerckhoffs' principle).

**Techniques (Domains)**

* **Spatial Domain:**

  * **LSB (Least Significant Bit):** Directly replace the least significant bits of pixel values with watermark bits. Very fragile, and can be destroyed by any compression.

  * **Spread Spectrum:** Pseudo-random noise watermark added to pixel values, detected via correlation.

* **Transform Domain (More Robust):**

  * **DCT-based:** Embed watermark in perceptually significant mid-frequency DCT coefficients (tradeoff between visibility and robustness to JPEG/MPEG). E.g., Cox et al.'s spread spectrum DCT method.

  * **DWT-based:** Embed in detail subbands (LH, HL, HH) at specific decomposition levels. Can exploit Human Visual System (HVS) masking properties (hide stronger marks in textured or edge regions).

* **Fragile / Semi-Fragile Watermarking:** Designed to break when an image is manipulated (authentication).

 

### **8\. Describe JPEG and PNG image compression and define the differences.**

### **JPEG**: JPEG is the most widely used standard for compressing continuous-tone (photographic) images. It is optimised for natural scenes and uses lossy compression.

- ### **Core Principle**

  ### It exploits psychovisual redundancy (removing information the human eye barely notices).

  ### And it operates on image blocks using the Discrete Cosine Transform (DCT).

### **PNG:** PNG is a lossless image compression standard designed as a patent-free replacement for GIF. It is optimised for images with sharp edges, text, and flat colour areas.

- ### **Core Principle**

  ### It reduces statistical and spatial redundancy without any data loss.

  ### It operates on scanlines (rows of pixels) using filtering and dictionary-based compression.

### **Key Differences: JPEG vs. PNG**

| Feature | JPEG | PNG |
| :---- | :---- | :---- |
| **Compression Type** | Lossy (based on human vision) | Lossless (pixel-perfect preservation) |
| **Principle** | Transform coding (DCT) \+ Psychovisual quantisation | Predictive filtering \+ Dictionary-based (DEFLATE) |
| **Ideal For** | Natural photos, smooth gradients, complex textures | Logos, icons, text, line art, screenshots, UI elements |
| **Performance on Photos** | Excellent (small file size, good quality) | Poor (very large file size) |
| **Performance on Text/Graphics** | Poor (blurring, compression artefacts) | Excellent (small file size, sharp edges) |
| **Transparency** | Not supported | Supported (Alpha channel) |
| **Colour Model** | YCbCr (typically) | RGB, Greyscale, Indexed Palette |
| **Artefacts** | Blocking (8x8 blocks) and ringing | None (pixel-perfect) |
| **Key Technology** | Quantisation of DCT coefficients | LZ77 \+ Huffman coding |

### 

### 

### **9\. MPEG and H.26x video compression standards. Describe methods that increase compression efficiency in modern video standards.**

### **MPEG** and **H.26x** are the two dominant families of video compression standards, developed by ISO/IEC and ITU-T respectively. They form the backbone of digital video, evolving through a shared hybrid coding framework to achieve ever-greater compression efficiency

### **MPEG Standards**

* **MPEG-1:** CD-ROM quality, VCD (1.5 Mbps). No interlaced support.

* **MPEG-2:** DVD, Digital TV broadcast (SD/HD). Added interlace, B-frames, scalable profiles.

* **MPEG-4 Part 2 (ASP):** Improved efficiency, video object planes. DivX/Xvid.

* **MPEG-4 Part 10 (AVC/H.264):** The modern breakthrough.

 

**H.26x (ITU-T VCEG) Standards**

* **H.261:** First practical digital video codec for ISDN conferencing. Introduced classic MB structure.

* **H.263:** Video over 3G, early VOIP. Foundation for MPEG-4 Part 2\.

* **H.264 (MPEG-4 AVC):** The dominant codec to this day. See methods below.

* **H.265 (HEVC):** 50% bitrate savings vs H.264 at same quality. CTU instead of MB, 64x64 blocks.

* **H.266 (VVC):** Further 50% bitrate savings for 8K, VR, HDR.

 

**Methods Increasing Compression Efficiency (Modern Standards)**

* **Block Partitioning:** Instead of fixed 16x16 macroblocks, modern codecs use Coding Tree Units (CTUs) up to 64x64 pixels. These can be recursively split using quad-trees, binary-trees, and ternary-trees, allowing the codec to perfectly match the block shape to the content.  
* **Advanced Intra-Prediction:** These directional modes predict a pixel block from its reconstructed neighbors, more accurately capturing complex textures.  
* **Advanced Inter-Prediction:** Modern codecs use multiple reference frames, sub-pixel motion estimation, and advanced Merge modes where motion vectors are inherited from neighbors, efficiently reducing temporal redundancy  
* **Variable Block Sizes & Quadtree Partitioning:** The classic 16x16 MB atom of H.264 was replaced by the **Coding Tree Unit (CTU)** up to 64x64 in HEVC, recursively split via a quadtree to find the optimal transform block size. Allows large, smooth areas and fine textures to be coded efficiently.  
* **Multiple Reference Frames & B-frames as reference:** Use of short-term and long-term reference frames, not just one past frame. B-frames (bidirectional) can be used as references for other frames, significantly improving temporal prediction.  
* **CABAC (Context-Adaptive Binary Arithmetic Coding):** Replaces older VLC tables (CAVLC). Probabilistic models are updated dynamically based on neighboring syntax elements, achieving higher compression than Golomb/VLC baselines.  
* **Advanced Motion Vector Prediction (AMVP) & Merge Mode:** Instead of coding the MV directly, the encoder builds a candidate list from spatially/temporally neighboring blocks and sends only an index to the list.

 

### **10\. Video on demand, progressive downloading, streaming and adaptive streaming and the standards used, security of streaming content.**

**Delivery Methods**

* **Video on Demand (VoD):** VOD is a service allowing users to select and watch video content whenever they choose, rather than at a scheduled broadcast time. The content is pre-recorded and stored, and the user can typically pause, rewind, and fast-forward. VOD services can use a variety of delivery methods, including progressive download and adaptive streaming.

* **Progressive Download:** Progressive download is a technique where a video file is downloaded like a standard web file (e.g., an MP4) but playback can begin before the download is complete. It is not true "streaming" as the data is not discarded after viewing but saved as a temporary file on the user's device .

**How it works:** The media player waits for a sufficient buffer of data, then begins playback while the download continues in the background.

**Limitations:** Seeking (jumping forward) is often restricted until that portion of the video has been downloaded, as the download is linear

* **Streaming:** True streaming delivers content as a continuous flow of data, allowing the user to watch without downloading a complete file. Adaptive Bitrate Streaming is a sophisticated form of streaming that has become the industry standard. It works by detecting a user's bandwidth and device capabilities in real time and dynamically adjusting the quality of the video stream to ensure smooth playback.

* **Adaptive Bitrate Streaming (ABR):** The revolutionary modern method. The video is encoded into multiple quality representations (bitrates/resolutions) and segmented into small chunks (2–10 seconds each). A **manifest file** (description of available chunks) is downloaded by the client. The client uses an **ABR algorithm** (heuristic buffer-based or throughput-based) to dynamically request the next chunk at the optimal quality for current network conditions. Seamless adaptation without interruption.

 

**Standards Used**

* **Legacy Streaming:**

  * **RTSP (Real-Time Streaming Protocol):** Control protocol (PLAY, PAUSE, SETUP). Like a "network remote control".

  * **RTP (Real-Time Transport Protocol):** Application-layer protocol encapsulating the actual audio/video data with sequence numbers, timestamps, and payload type. Uses UDP.

* **Adaptive Streaming over HTTP:**

  * **MPEG-DASH (Dynamic Adaptive Streaming over HTTP):** International, codec-agnostic standard. Uses XML manifest (MPD file).

  * **Apple HLS (HTTP Live Streaming):** Apple's standard. Manifest is an .m3u8 playlist. Required on iOS. Segment format is MPEG-TS or fMP4.

* **WebRTC:** For ultra-low latency browser-to-browser communication (p2p conference). Uses SRTP for encryption, ICE/STUN/TURN for NAT traversal.

 

**Security of Streaming Content**

* **DRM (Digital Rights Management):** The systematic encryption of content and control of its decryption.

  * **Encryption:** Video chunks are encrypted (typically AES-128) server-side.

  * **Key System:** The client uses a DRM module (**Widevine** (Google), **PlayReady** (Microsoft), **FairPlay** (Apple)) to decrypt.

  * **License Server:** The client authenticates and requests a decryption key from a license server. The license can enforce rules (expiry, resolution cap, offline viewing allowed).

* **Token-Based Access:** Short-lived, signed URLs to CDN content prevent hotlinking.

* **Encrypted Transport:** TLS (HTTPS) is mandatory for all manifests and key requests. Prevents man-in-the-middle snooping.



## **MPA OSE**

### **1\. Transmission properties of Optical fibers, Multi-mode and Single-mode fibers, Polymer optical fibers (POF).**

**Basic Principle**

Light propagates via **total internal reflection**. The core has a slightly higher refractive index (n₁) than the cladding (n₂). Light entering the core at an angle greater than the critical angle is guided.

 

**Key Transmission Properties**

* **Attenuation:** Signal power loss over distance, measured in dB/km. Caused by absorption (OH⁻ ions, material impurities) and scattering (primarily Rayleigh scattering).

* **Dispersion:** Pulse broadening over distance. Limits bitrate or maximum reach.

* **Numerical Aperture (NA):** This determines light gathering ability and coupling efficiency.

 

**Multi-Mode Fiber (MMF)**

* **Core diameter:** Typically 50 µm or 62.5 µm (large compared to wavelength).

* **Propagation:** Allows multiple spatial modes (paths) of light to propagate simultaneously.

* **Limitation:** **Modal dispersion** is dominant. Different modes travel different path lengths, causing pulse spreading. Limits bandwidth-distance product.

* **Types:**

  * **Step-index:** Sharp index change. Highest modal dispersion.

  * **Graded-index:** Parabolic core index profile refracts outer rays back to center, equalizing mode propagation delays. Much higher bandwidth.

* **Use:** Short-reach intra-building, data centers (OM3, OM4, OM5 fibers).

 

**Single-Mode Fiber (SMF)**

* **Core diameter:** \~9 µm (small, comparable to wavelength \~1.3–1.55 µm).

* **Propagation:** Only the fundamental mode (HE₁₁) propagates. No modal dispersion.

* **Limitation:** Chromatic dispersion and polarization mode dispersion. Enables very high bandwidth over long haul (\> 80 km).

* **Standard:** ITU-T G.652 (standard SMF), G.655 (NZDSF \- Non-Zero Dispersion Shifted Fiber), G.657 (bend-insensitive).

 

**Polymer Optical Fiber (POF)**

This type of optical fiber is made of plastic (PMMA core, fluorinated polymer cladding). Large core (often 980 µm or 1 mm).

* **Advantages:** Very easy to connect/terminate, highly flexible, robust. Low cost transceivers (red LEDs).

* **Disadvantages:** High attenuation (\~150–200 dB/km). Low bandwidth.

* **Use:** Very short links (\< 100 m): home networking, automotive (MOST bus), industrial control systems.

### **2\. Connecting Optical fibers. Passive optical components (circulator, coupler, isolator, attenuator).**

**Connecting Optical Fibers**

* **Fusion Splicing:** Permanently bonding two fiber ends by melting them with an electric arc. Lowest loss (typically \< 0.05 dB) and robust. Automated alignment.

* **Mechanical Splicing:** Aligning fibers in a precision holder with index-matching gel. Temporary/quick fix, higher loss (\~0.2–0.5 dB).

* **Connectors:** Demountable connection. Standard types: SC (Subscriber Connector, square push-pull), LC (Lucent Connector, small form, dominant in data/telecom), FC, ST. Key parameter: Insertion Loss, Return Loss (reflection).

 

**Passive Optical Components**

* **Optical Isolator:** This allows light to pass in one direction only, it blocks reflected light and it is based on **Faraday rotator**.

**Use:** Protects lasers from back-reflections causing instability.

* **Optical Circulator:** This is a 3-port non-reciprocal device. Light entering Port 1 exits Port 2; light entering Port 2 exits Port 3; light entering Port 3 exits Port 1\. It separates forward and backward propagating signals on the same fiber. **Use:** Bidirectional transmission on one fiber, pump coupling into an amplifier, and separation of reflected OTDR test signals.

* **Optical Coupler / Splitter:** This splits or combines optical power from one or more fibers. It is based on fused biconical taper or planar lightwave circuits (PLC).

**Use:** PON distribution, monitoring taps.

* **Optical Attenuator:** Optical attenuators precisely reduce optical power. Types includes

**Fixed attenuator:** known fixed loss (e.g., 3, 5, 10 dB). Uses doped fiber, air gap, or neutral density filter.

**Variable attenuator (VOA):** electrically or manually adjustable

 

### **3\. Sources and detectors of radiation \- their parameters and characteristics.**

**Sources (Transmitters)**

* **LED (Light Emitting Diode):** This produces incoherent light and has broad spectral width (\~30-100 nm). They are low cost, low power consumption, slower modulation (up to few hundred Mbps).

**Use:** MMF short-reach, POF, low-rate industrial.

* **Laser Diode (LD) / Fabry-Perot (FP) Laser:** Laser Diodes have faster direct modulation and have a narrower spectral width (\~1-4 nm). They are coherent and have higher power (up to \~10 Gbps).

* **DFB (Distributed Feedback) Laser:** They have an extremely narrow spectral width (\~0.1 nm for DFB) with a single longitudinal mode operation.

**Use:** Long-haul, high bitrate (\>10 Gbps), DWDM systems.

 

**Detectors (Receivers)**

* **PIN Photodiode:** A PIN diode is a semiconductor that belongs to the diode family. Unlike normal diodes, PIN diodes include three layers:

* p-type (high-quality) semiconductor layer

* Intrinsic (undoped or gently doped) semiconductor layer

* n-type (poor) semiconductor layer

* **APD (Avalanche Photodiode):** An Avalanche photodiode (APD) is a highly sensitive semiconductor detector that uses the photoelectric effect to convert optical signals into electrical signals. APD operates in reverse bias and uses avalanche breakdown to amplify weak optical signals for higher sensitivity. 

### **4\. Linear & Nonlinear Phenomena in Optical Fibers**

**Linear Phenomena**

At low power, light follow the superposition principle. This means, wave pass through each other without interacting.

* **Attenuation:** Attenuation is the gradual reduction in intensity, strength, or amplitude of a signal, wave, or energy as it travels through a medium or over a distance. It is usually expressed in dB/km.

* **Chromatic Dispersion (CD):** Chromatic Dispersion (CD) is the broadening of light pulses in optical fibers caused by different wavelengths traveling at different speeds. CD is mainly caused by the material's refractive index.

* **PMD (Polarization Mode Dispersion):** Mode dispersion occurs mainly in multi mode fibers, because light travels in multi modes, they form a zigzag paths which makes parts of a pulse to arrive at different times.

 

**Nonlinear Phenomena**

At high power, the superposition principle fails. The electromagnetic waves begin to interact with each other and with the medium, altering how light propagates.

* **Second Order Non Linear Phenomena:** This effect involves interaction of two photons. It is common in crystals that lack inversion symmetry.

* **Third Order Non Linear Phenomena:** This is a dominant effect in standard optical fibers. It includes Self-Phase Modulation(SPM), Cross-Phase Modulation(XPM), Four-Wave Mixing (FWM) and Simulated Scattering

 

### **5\. Wavelengths and bands used for transmission in singlemode optical fibers. Attenuation and dispersion (chromatic dispersion \- CD and polarization mode dispersion \- PMD. Methods of suppression of dispersion effects.**

**Wavelength Bands for SMF (ITU-T)**

Based on the loss spectrum of silica fiber and amplifier availability:

* **O-band (Original):** 1260–1360 nm. Zero-dispersion region of standard G.652 fiber, minimal chromatic dispersion. Used for high-speed (40G/100G) short/medium reach with direct modulation.  
* **E-band (Extended):** 1360–1460 nm. High OH⁻ water peak attenuation. With low-water peak fibers (G.652D), E-band is now usable.  
* **S-band (Short):** 1460–1530 nm.  
* **C-band (Conventional):** 1530–1565 nm. The most important band. Lowest attenuation (\~0.2 dB/km), EDFA gain region. Dominates DWDM long-haul and metro.  
* **L-band (Long):** 1565–1625 nm. Higher attenuation than C-band, but amplified by gain-shifted EDFAs.  
* **U-band (Ultralong):** 1625–1675 nm. Monitoring, maintenance channels.

 

**Attenuation:** Attenuation is the gradual reduction in intensity, strength, or amplitude of a signal, wave, or energy as it travels through a medium or over a distance. It is usually expressed in dB/km.

**Chromatic Dispersion (CD):** Chromatic Dispersion (CD) is the broadening of light pulses in optical fibers caused by different wavelengths traveling at different speeds. CD is mainly caused by the material's refractive index.

**PMD (Polarization Mode Dispersion):** Mode dispersion occurs mainly in multi mode fibers, because light travels in multi modes, they form a zigzag paths which makes parts of a pulse to arrive at different times.

**Suppression:** PMD compensators (optical or electronic PMD equalizers in DSP).

 

### **6\. Optical Amplifiers, Switches & Modulators**

**Optical Amplifiers**

Optical amplifiers  amplify an optical signal directly, without the need to first convert it to an electrical signal. They include

* **EDFA (Erbium-Doped Fiber Amplifier):** Erbium-Doped Fiber Amplifiers amplify weak fiber optic signals directly in the (C- and L-bands) range without electrical conversion.

* **Raman Amplifier:** A Raman amplifier boosts signal strength in optical fibers using stimulated Raman scattering (SRS), typically providing broad bandwidth and low-noise amplification. 

* **SOA (Semiconductor Optical Amplifier):** A Semiconductor Optical Amplifier (SOA) amplifies optical signals using a semiconductor gain medium, typically without converting them to electrical signals

 

**Optical Switches**

This is a multi port network bridge which connects multiple optic fibers to each other and also routes data packets between inputs and outputs.

**Types of Optical Switches:**

**Opto \- Mechanical switch:** This switch works by physically moving optical fibers with the help of mechanical equipment. There three main types of mechanical switches;

* One uses prism to switch optical path  
* The second uses mirror and  
* The last moves the optical fiber itself

**Micro Mechanical Switch:** MEMS switches are almost like mechanical switches in principle, but the differentiating factor is the intricacy and miniature sizes of these switches.

**Optical Modulators**

These are devices which can be used to manipulate a property of light. Optical modulators do come in various types, they include;

* **Acoustic Optic Modulators:** This device is used to control the power of a laser beam with an electrical drive signal.. It is based on modification of the refractive index of some crystals.  
* **Electro-optic Modulators:** This is used to control the phase or polarization of light with an electrical control signal. They usually contain pocket cells and polarizers.  
* **Electro Absorption Modulators:** This is a semiconductor based optical modulator used for controlling(modulating) the intensity of a laser beam via electric voltage.

 

### **7\. FTTx access networks. Standards and transmission rates for passive optical networks (PON).**

**FTTx (Fiber To The X):** This is a family of optical access architectures bringing fiber closer to end user

* **FTTH (Home):** Fiber all the way to the subscriber's living unit.

* **FTTB (Building):** Fiber to the building, then copper/in-building wiring.

* **FTTC/FTTN (Curb/Node):** Fiber to a street cabinet/node, then existing copper (VDSL2) for the last few hundred meters.

* **FTTO (Office):** Fiber directly to the business.

**Standards**

* **GPON (Gigabit-capable PON):** This has a downstream of 2.488 Gbps and an upstream of 1.244 Gbps with a split ratio: up to 1:64 (typically 1:32) and can reach 20 km.  
* **XG-PON (10 Gigabit-capable PON):** This has a downstream of 10 Gbps, upstream of 2.5 Gbps and covers a reach of 20 km.  
* **NG-PON2 (Next-Generation PON 2):** This uses TWDM (Time and Wavelength Division Multiplexing) with each wavelength pair 10/2.5 Gbps and can be upgraded.  
* **50G-PON (Higher Speed PON):** This is the latest standard. It has 50 Gbps downstream per wavelength. It enables future-proofing for 5G fronthaul, enterprise, high-bandwidth residential.

 

### **8\. High-speed data transmission systems (modulation formats, polarization multiplex, transceivers).**

**Modulation Formats**  
Modulation formats map digital bits onto physical properties of the optical carrier (amplitude, phase, polarization, or combinations).

* **QPSK (Quadrature Phase Shift Keying):** 2 bits per symbol. Encoded in 4 phase states (0°, 90°, 180°, 270°). 100G long-haul uses PM-QPSK (Polarization Multiplexed QPSK).  
* **QAM (Quadrature Amplitude Modulation):** This combines amplitude and phase modulation with symbols arranged in a rectangular constellation.  **16QAM** (4 bits/symbol), **64QAM** (6 bits/symbol). 

 

**Polarization Multiplex (PM)**

These are two independent data streams that are transmitted on the *same wavelength* using orthogonal polarizations (X and Y).

 

**Transceivers (Pluggable Modules)**

These are modules integrating transmitter, receiver, and often DSP for a given rate, reach, and form factor.

* Form factors evolved from SFP (1G), SFP+ (10G), to QSFP28 (100G), QSFP-DD (400G), OSFP (800G).

* **Direct-Detect (10G NRZ):** Simple PD.

* **Coherent Pluggable (100G to 800G-ZR):** Full “full” system on a chip: integrates a narrow-linewidth tunable laser, DP-IQ modulator, integrated coherent receiver, and high-performance DSP for CD/PMD compensation and FEC decoding. 400G-ZR enables DWDM routing on a QSFP-DD directly into a router port.

 

### **9\. Multiplexing Techniques – WDM, DWDM, CWDM**

**WDM (Wavelength Division Multiplexing)**

Wavelength Division Multiplexing (WDM) is a fiber-optic transmission technique that increases bandwidth by multiplexing multiple optical carrier signals onto a single fiber using different wavelengths (colors) of laser light. It allows data to be transmitted simultaneously in both directions, maximizing fiber capacity without installing new cables.

 

**DWDM (Dense WDM)**

DWDM (Dense Wavelength Division Multiplexing) is an advanced optical transmission technology that increases the capacity of optical fibers by combining dozens of data streams (wavelengths) into a single fiber..

 

**CWDM (Coarse WDM)**

Coarse Wavelength Division Multiplexing (CWDM) is used to expand the capacity of fibre optic networks. It enables multiple data streams to be transmitted over different light wavelengths through a single fibre.

 

### **10\. Transmission & OTDR Measurement Methods**

These methods characterise the end-to-end performance of an optical fibre link. Essential for installation acceptance, commissioning, and troubleshooting.

**Transmission Measurement Methods**

* **Optical Power & Loss Measurement:** This compares power launched into fibre with power received at the far end. It verifies channel wavelengths, power per channel, OSNR (Optical Signal-to-Noise Ratio).

* **Optical Spectrum Analyzer (OSA):** This measures optical power as a function of wavelength. It verifies channel wavelengths, power per channel, OSNR (Optical Signal-to-Noise Ratio).

* **BER (Bit Error Rate) Tester:** In this, a pseudo-random bit sequence is transmitted, the receiver counts errored bits ratio.

* **Dispersion Analyzer:** This measures CD and PMD using the phase-shift method (modulated light) or interferometric method.

 

**OTDR (Optical Time Domain Reflectometer)**: This is based on the principle of Rayleigh backscattering. A high-power pulsed laser is launched into the fiber, as the pulse propagates, a minute Rayleigh backscatter is continuously reflected back to the OTDR. The received signal level is plotted vs. time (converted to distance using group index n\_g).

**Use:** Fault localization, connector/splice loss verification, end-to-end fiber length measurement, commissioning and maintenance. Unique tool for *single-ended* measurement.

 



## **MPA PKT**

### **1\. The role of the IPv4 (Internet Protocol version 4\) layer. IPv4 addresses. IPv4 datagram. ICMPv4 protocol.**

**Role of the IPv4 Layer**

The IPv4 layer is the major network layer protocol in the TCP/IP architecture, it is responsible for providing a connectionless, best-effort datagram delivery service across interconnected networks. Its fundamental role is to enable addressing and routing so that data packets can travel from a source to a destination host, potentially crossing multiple intermediate networks with different underlying link-layer technologies.

**IPv4 Addresses**

An IPv4 address is a thirty-two-bit numerical identifier assigned to each network interface on a host or router, enabling unique identification for packet delivery. Addresses are conventionally written in dotted-decimal notation as four decimal octets separated by dots, for example 192.168.1.1, with each octet representing eight bits.

* Classes (A, B, C, D, E) have been functionally replaced by **CIDR (Classless Inter-Domain Routing)** . Notation: address/prefix-length (e.g., 10.0.0.0/8).

* Addresses can be **Public** (globally routable) or **Private** (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).

* **Subnet Mask**: distinguishes the network part from the host part.

* **Special Addresses**: Loopback (127.0.0.1), Link-Local (169.254.0.0/16), Broadcast (255.255.255.255).

 

**IPv4 Datagram**

An IPv4 datagram is the fundamental data unit transmitted across IP networks, it encapsulates payload from a higher-layer protocol within a header containing necessary control information. The header has a minimum length of twenty bytes, which can be extended by options.

* Key fields (20 bytes base):

  * **TTL (Time To Live):** Decremented by each router. Discarded at 0 to prevent loops.

  * **Protocol:** Identifies the upper-layer protocol (6=TCP, 17=UDP, 1=ICMP).

  * **Identification, Flags, Fragment Offset:** Used for fragmentation/reassembly. **DF (Don't Fragment)** flag can be set for Path MTU Discovery.

 

**ICMPv4 Protocol**

The Internet Control Message Protocol version four, or ICMPv4, is an integral companion to IPv4 providing error reporting, diagnostic functions, and network-layer control information. Although ICMP messages are carried as IP datagram payload, ICMP is considered a network-layer protocol, not a transport layer, and is a required part of every IPv4 implementation.

* **Error Messages:** Destination Unreachable (type 3), Time Exceeded (type 11, used by traceroute), Redirect (type 5).

* **Query Messages:** Echo Request (type 8\) and Echo Reply (type 0\) — the basis of ping.

 

### **2\. Transport layer protocols and their comparison.**

**TCP (Transmission Control Protocol)**

* **Connection-oriented:** Three-way handshake (SYN, SYN-ACK, ACK) required.

* **Reliable:** Acknowledgments (ACKs) and sequence numbers guarantee delivery and ordering.

* **Flow Control:** Sliding window mechanism prevents overwhelming the receiver.

* **Congestion Control:** Algorithms (Slow Start, Congestion Avoidance, Fast Retransmit) adapt the sending rate to network conditions.

* **Overhead:** Larger header (20-60 bytes). High granularity.

 

**UDP (User Datagram Protocol)**

* **Connectionless:** No setup, just fires packets.

* **Unreliable:** No guaranteed delivery, order, or duplicate protection.

* **Lightweight:** Header is only 8 bytes (Source Port, Dest Port, Length, Checksum).

* **Use cases:** Real-time traffic (VoIP, video), DNS, network control. Provides minimum framing from application to IP layer.

 

**SCTP (Stream Control Transmission Protocol)**

* **Connection-oriented:** Uses a four-way handshake (INIT, INIT-ACK, COOKIE-ECHO, COOKIE-ACK) for initial setup, providing protection against SYN flooding denial-of-service attacks.

* **Reliable:** Acknowledgments, sequence numbers, and selective acknowledgments ensure reliable delivery; supports both ordered and unordered delivery within the same association.

* **Message-oriented:** Preserves application message boundaries like UDP, but with reliable delivery like TCP.

* **Handshake security:** Cookie mechanism during association setup prevents blind resource allocation attacks.

### **3\. Domain Name System (DNS): description of protocol operation, role of stub and recursive resolver, DNS root servers, DNSsec.**

**Domain Name System (DNS) — Protocol Operation**

The Domain Name System is a hierarchical, distributed naming system that translates human-readable domain names into machine-usable IP addresses and provides other resource information. It operates as an application-layer protocol, typically using UDP on port 53 for queries and responses, falling back to TCP for large responses exceeding the UDP maximum segment size or for zone transfers.

 

**Role of Stub and Recursive Resolver**

The stub resolver is a minimal DNS client library running on the end host, embedded within the operating system or application. It has limited capability, it does not perform the iterative resolution process itself, it can formulate DNS queries, send them to a configured recursive resolver, and process the returned response.


**DNS Root Servers**

The DNS root servers are the entry point to the DNS hierarchy, serving the root zone containing the delegations for all top-level domains including generic TLDs such as .com, .org, and .net, and country-code TLDs such as .uk, .de, and .jp etc

 

**DNSSEC (DNS Security Extensions)**

DNSSEC is a suite of extensions to the DNS protocol that provides origin authentication of DNS data, data integrity, and authenticated denial of existence. It does not provide confidentiality or encryption. DNSSEC protects against DNS spoofing and cache poisoning attacks by enabling resolvers to cryptographically verify that the DNS response data originates from the legitimate authoritative source and has not been tampered with in transit.

 

### **4\. The principle of default gateway backup protocols. Hot Standby Router Protocol (HSRP) and Virtual Router Redundancy Protocol (VRRP).**

**The principle of default gateway backup protocols.**

Default gateway backup protocols, formally known as First Hop Redundancy Protocols (FHRPs), eliminates the single point of failure that a single default gateway represents in a local network . Without them, if the default gateway router fails, hosts cannot reach external networks.

The core principle is creating a virtual router—a logical entity shared by two or more physical routers. This virtual router has a Virtual IP (VIP) and a Virtual MAC address independent of any physical router . Hosts are configured with the VIP as their default gateway, making the underlying physical routers and any failover completely transparent.

 

**HSRP (Hot Standby Router Protocol)**

HSRP is a Cisco-proprietary FHRP that provides network redundancy for IP networks . It operates with a clear active or standby model where only one router actively forwards traffic for the virtual gateway at any time. The active router is elected by the highest priority value; if priorities tie, the router with the highest physical interface IP address wins. It uses UDP port 1985\.

 

**VRRP (Virtual Router Redundancy Protocol)**

VRRP is an open, IETF standard protocol defined in RFC 3768, it functions as the industry-standard alternative to the proprietary HSRP, which makes it suitable for multi-vendor environments. VRRP uses the multicast address 224.0.0.18 for its hello advertisements.

### **5\. Multicast traffic, Addressing, Multicast protocols.**

**Multicast Traffic**

Multicast traffic is a communication method where a single source sends data simultaneously to a selected group of interested receivers, rather than to a single destination as in unicast or to all hosts as in broadcast. Multicast traffic is efficient because the source transmits each packet only once regardless of the number of receivers. Replication of the packet occurs only where necessary at branching points within the network, conserving bandwidth and source processing resources.

**Multicast Addressing**

Multicast Addressing uses dedicated address ranges at both the IP layer and the link layer to identify groups of hosts rather than individual interfaces. 

At the IP layer, IPv4 multicast addresses fall within the Class D range 224.0.0.0 through 239.255.255.255.

**Multicast Protocols**

* **IGMP (Internet Group Management Protocol):** IGMP operates between hosts and their directly connected multicast routers. Its purpose is for hosts to signal membership in multicast groups and for routers to learn which groups have receivers on each subnet.

* **PIM (Protocol Independent Multicast):** PIM is the dominant multicast routing protocol used between routers to build distribution trees. It is called protocol independent because it uses the underlying unicast routing table to determine paths, regardless of which unicast routing protocol populates that table.

### **6\. IPv6 (Internet Protocol version 6): protocol characteristics and comparison with IPv4, transition mechanisms.**

### **IPv6 — Protocol Characteristics**

### IPv6 is the next-generation network layer protocol designed to succeed IPv4 by addressing its fundamental limitations while providing enhanced functionality. The defining characteristic is the vastly expanded address space using 128 bit addresses, effectively eliminating address scarcity. Addresses are written as eight colon-separated groups of four hexadecimal digits, with leading zeros and a single longest run of zero groups compressible.

 IPv6 fixes the address exhaustion of IPv4, it restores end-to-end connectivity, and natively supports better QoS mechanisms via the **Flow Label** and Traffic Class fields in the header.

* It has 128-bit addresses allowing for \~3.4×10³⁸ addresses  
* It uses SLAAC for autoconfiguration instead of DHCP  
* It has native support for authentication and encryption


**Comparison of IPv6 with IPv4**

* IPv6 expands the address length from thirty-two bits to one hundred twenty-eight bits, fundamentally solving address exhaustion.   
* The IPv6 header is simplified and fixed at forty bytes, whereas IPv4 has a variable-length header from twenty to sixty bytes due to options and includes a checksum that requires recalculation at each hop.   
* IPv6 eliminates broadcast, relying instead on multicast and anycast for group communication. Fragmentation in IPv6 is solely end-to-end; routers never fragment, unlike IPv4 where intermediate routers can fragment oversized datagrams.   
* Address configuration in IPv6 supports full stateless autoconfiguration alongside DHCPv6, compared to IPv4's reliance on manual configuration or DHCP. 

 

**Transition Mechanisms**

Because IPv4 and IPv6 are incompatible protocols, a range of transition mechanisms have been developed to enable coexistence and gradual migration. These includes;

**Dual Stack** is the fundamental and preferred transition mechanism. A node or router runs both IPv4 and IPv6 protocol stacks simultaneously, independently communicating with IPv4-only hosts and IPv6-only hosts. 

**Tunnelling** encapsulates IPv6 packets inside IPv4 packets for transmission across IPv4-only infrastructure. Manual tunnelling, such as IPv6 over IPv4 with configured tunnels, establishes a point-to-point tunnel with explicitly defined endpoints.

### **7\. IPv6 (Internet Protocol version 6): IPv6 header and extension header system, addressing**

**IPv6 Base Header**

The basic IPv6 header is much simpler than the IPv4 header. It has a fixed length of 40 bytes, which makes processing faster in hardware and software.

* Version   
* Traffic Class, which is used for QoS  
* Flow Label, a field that has no equivalent in IPv4   
* Payload Length, which tells us how much data follows the header   
* Next Header replaces the old Protocol field   
* Hop Limit serves the same purpose as TTL in IPv4.  
* Source Address and Destination Address, each 128 bits.

 

**Extension Header System**

IPv6 uses a chain of extension headers instead of the variable-length options field found in IPv4. The Next Header field points to the first extension header, and each extension header has its own Next Header field pointing to the next one, until finally pointing to the upper-layer protocol like TCP or UDP.

1\. **Hop-by-Hop Options:** (0) Must be examined by every router.

2\. **Routing Header:** (43) Source routing (like IPv4 loose source routing).

3\. **Fragment Header:** (44) For fragmentation done *only* by the source node.

4\. **Authentication Header (AH), Encapsulating Security Payload (ESP):** For IPSec.

5\. **Destination Options Header:** (60) Options for the destination node (and optionally intermediate routers in a Routing Header).

 

**IPv6 Addressing**

* IPv6 addresses are 128 bits

* Unicast address for one \- one communication, Multicast for one to many and no broadcast

* 2000::/3: Global Unicast (routable public addresses, typically /48 or /64 for a site).

* fe80::/10: Link-Local (non-routable, fe80:: at the start, mandatory for every interface, used for internal communication like NDP).

* fc00::/7 (Used as fd00::/8): Unique Local Addresses (ULA), similar to private IPv4 addresses.

* ff00::/8: Multicast.

* ::1/128: Loopback.

### **8\. IPv6 (Internet Protocol version 6): features of the ICMPv6 protocol, description of address autoconfiguration in an IPv6 network.**

**ICMPv6 Features**

ICMPv6 is an integral part of IPv6, combining the functions of ICMPv4, ARP, and IGMP from the IPv4 world into a single unified control protocol. It uses the next header value 58 and is mandatory for every IPv6 implementation. ICMPv6 provides error reporting, diagnostic functions, and critical network-layer operations that enable IPv6 to function without ancillary protocols.

* **Error/Informational Messages:** Destination Unreachable (type 1), Time Exceeded (type 3), Echo Request/Reply (Ping).

* **NDP (Neighbor Discovery Protocol):** Uses five ICMPv6 message types:

  * **Router Solicitation (RS, 133\) / Router Advertisement (RA, 134):** Host asks for and router provides prefix, gateway, hop limits, etc.

  * **Neighbor Solicitation (NS, 135\) / Neighbor Advertisement (NA, 136):** Replaces ARP to resolve IPv6 to MAC. Uses multicast, not broadcast.

  * **Redirect (137):** A better first-hop router exists.

* **MLD (Multicast Listener Discovery):** Replaces IGMP. Uses ICMPv6 messages for hosts to report multicast group interest to routers.

 

**Address Autoconfiguration in an IPv6 Network (SLAAC)**

* Stateless. No DHCP server needed for basic IP assignment.

* **Step 1:** Host generates a Link-Local address (fe80::...).

* **Step 2:** Host sends an **Router Solicitation** message to discover routers.

* **Step 3:** Router replies with a **Router Address** containing a network prefix (e.g., 2001:db8:1::/64) and flags. "Autonomous Address-Configuration" (A) flag \= 1 in the Prefix Information Option, implying SLAAC is permitted for this prefix.

* **Step 4:** The host creates its address by combining the prefix with an Interface Identifier (IID). The IID is usually 64 bits, generated from the MAC address using **EUI-64** rules, or now typically randomized for privacy (Privacy Extensions).

* **Step 5:** The host performs **Duplicate Address Detection (DAD)** on the newly generated IP before using it (using NS messages).

### **9\. Autonomous systems: Basic characteristics of the Border Gateway Protocol (BGP). Peering and transit.**

**Autonomous System (AS)**

Autonomous System is a collection of IP networks/routers under a single administrative domain with a unified routing policy. Identified by a unique **AS Number (ASN)** , a 16-bit or 32-bit number. An autonomous system may be a single service provider network, a large enterprise, a university, a government agency, or a content provider.

 

**Basic Characteristics of BGP (Border Gateway Protocol)**

BGP is the path-vector routing protocol that manages how packets are routed between autonomous systems. It operates using a reliable transport protocol, establishing TCP connections on port one hundred seventy-nine between peer routers.

**Peering vs. Transit**

* **Peering:** A business relationship where two ASes exchange routes for their own networks (and their downstream customers' networks) **without charging** each other for the traffic. This is usually done when the traffic ratios are roughly equal. Settlement-free.

* **Transit:** A customer-provider relationship. The customer pays the provider (the transit AS) to advertise the customer's routes to the entire internet, and to carry the customer's traffic to and from remote networks. This is a paid service.

 

### **10\. Theory of finite-state machines and its application to communication protocols, methods of graphical representation.**

**Theory of Finite-State Machines**

A finite-state machine (FSM) is a mathematical model used to describe systems that can exist in a finite number of distinct states, transitioning between these states in response to external inputs or events.

Its features are;

* A finite set of states

* A non-empty set of input symbols

* The transition function, which maps a current state and an input to the next state

* The initial state, where the machine begins.

* A set of accepting or final states.

**Types of FSMs:**

* **Deterministic (DFA):** For every state, there is exactly one strictly defined transition for each possible input.  
* **Non-Deterministic (NFA):** A given state and input can lead to multiple possible next states. Any NFA can be mathematically converted into an equivalent DFA.

**Examples of FSMs:**

**Mealy Machine:** Mealey machines are machines whose outputs are determined by the current state *and* the input event. Actions occur on transitions.

**Moore Machine:** Mealey machines are machines whose outputs are determined solely by the current state. Actions are associated with the state itself.

 

**Application to Communication Protocols**

Communication protocols are inherently stateful: each protocol entity moves through well-defined phases such as idle, connecting, connected, and closing, with behaviour strictly specified for every possible input in every state. Finite-state machines provide the formal foundation for specifying, implementing, and verifying these protocols

 

**Graphical Representation**

Graphical representation of finite-state machines makes protocol specifications human-readable, aids in analysis, and serves as a communication tool between designers, implementers, and testers. This involves the use of;

* **State Transition Diagrams (STDs) / Statecharts:**

  * **Circles/Nodes/Rounded Boxes:** States.

  * **Directed Arrows:** Transitions. Labeled with Event \[Condition\] / Action. Example: Rcvd SYN / Send SYN+ACK.

  * **Initial State:** Marked with a filled black circle leading into the first state.

  * **Final State:** A circle with a smaller filled circle inside.

* **State Transition Table:** A tabular form listing rows for each state and columns for each event. The cell shows the next state and the actions to take. It's a more thorough but less visual method.



## **MPA PZP**

### **1\. Parallelism: Utilization & Technologies**

Parallelism is the simultaneous execution of multiple tasks, computations, or data transfers to improve overall performance (throughput, latency, efficiency).

The goal is to overcome bottlenecks of sequential processing.

**Utilization of Parallelism**

* **Reduced Latency:** Tasks complete faster when subdivided and processed concurrently.  
* **Fault Tolerance/Resilience:** Redundant parallel paths provide backup in case of failure.  
* **Resource Efficiency:** Better utilisation of available capacity; idle resources put to work concurrently.  
* **Scalability:** System performance scales by adding more parallel elements rather than increasing speed of a single element.

 **Parallel Technologies in Communication Networks**

* **Wavelength Division Multiplexing (WDM/DWDM):** Multiple optical carriers (wavelengths) transmit independently in parallel on a single fibre.  
* **Link Aggregation (LAG):** Multiple physical links between two nodes bound into one logical link to increase bandwidth plus redundancy.  
* **MIMO (Multiple Input Multiple Output):** Multiple antennas at transmitter and receiver send/receive independent data streams in parallel over the same radio channel.  
* **Multi-path Routing:** Traffic between a source and destination distributed across multiple paths simultaneously, this improves utilisation and resilience.

 

### **2\. CPU: Parallel Program Design, Threads/Processes & Synchronization**

Parallel program design involves decomposing a problem so multiple parts execute simultaneously on multiple CPU cores or processors.

**Key design steps:**

* **Decomposition**: Break problems into concurrent tasks.  
* **Data decomposition:** Same operation on different data chunks (e.g., array processing).  
* **Task decomposition:** Different operations on same or different data.

**Design challenges:**

* Race conditions, deadlocks, livelocks, starvation.  
* **Load imbalance:** some threads idle while others overloaded.  
* **Overhead:** Thread creation, context switching, synchronisation cost.

**Threads vs. Processes**

* **Process:** A process is an instance of a program, it has its own private address space, memory, file descriptors. IPC (Inter-Process Communication) via pipes, sockets, shared memory. 

* **Thread:** A thread is a  lightweight execution unit *inside* a process, it shares the same memory address space and resources with other threads in the process. Communication is trivial (shared memory), but must be synchronized. 

**Data Synchronization Primitives (Lock, RLock, Semaphore)**

* **Lock:** A simple binary flag (mutex, mutual exclusion) for providing exclusive access to a shared resource. A thread can acquire() (if free) or block waiting. Use: protecting a critical section.

* **RLock (Reentrant Lock):** This is a variant of Lock that allows the same thread to acquire the lock multiple times without deadlocking itself.

* **Semaphore:** This is a more general synchronisation primitive that maintains a non-negative integer counter.

### **3\. GPU: Threads, Blocks, Grid & Streaming Multiprocessor**

GPU executes massively parallel workloads using a hierarchical organisation of threads to manage thousands of concurrent computations efficiently.

**In GPU**

* **Thread:** The thread is the smallest unit of execution on a GPU. Each thread executes the same kernel code but operates on different data

* **Block:** A block is a group of threads that execute on the same Streaming Multiprocessor (SM). Threads within a block can cooperate via shared memory and synchronise using barrier synchronisation.

* **Grid:** A grid is a collection of all thread blocks launched for a single kernel execution. It defines the total number of blocks and thus total threads for the computation. Blocks within a grid execute independently: no synchronisation or direct data sharing between different blocks of the same grid.

 

**Characteristics of Streaming Multiprocessor (SM)** 

The Streaming Multiprocessor is the fundamental computational unit in a GPU; a GPU contains multiple SMs (tens to hundreds depending on the architecture).

**Structural components of an SM:**

* Multiple CUDA Cores (e.g., 64 FP32 cores per SM in Volta).  
* Warp Schedulers (e.g., 4 per SM) that schedule warps onto CUDA cores.  
* Register File: Fastest memory, partitioned among threads.  
* Shared Memory / L1 Cache (on-chip, programmable vs. cache).  
* Function: Executes warps from multiple blocks concurrently, hiding memory latency by context-switching between warps that have data ready (warp-level parallelism).

 

### 

### **4\. GPU \- memories \- speed, size, usage (thread, block, grid).**

**Registers** are the fastest memory on the GPU with access latency of a single clock cycle. They are private to each individual thread; one thread cannot access another thread's registers. The register file size per Streaming Multiprocessor is limited (e.g., 256 KB per SM), and this is statically partitioned among all threads of all active blocks. If a kernel uses too many registers per thread, the number of concurrently resident blocks decreases, reducing occupancy and the ability to hide memory latency.

**Shared Memory** is on-chip SRAM accessible by all threads within the same thread block. Its latency is very low (approximately 20–30 clock cycles), much faster than global memory. Size is typically configurable per SM together with L1 cache (e.g., up to 100–164 KB combined, adjustable split). Shared memory is programmer-managed and explicitly allocated. It enables efficient cooperation within a block: threads load data from slow global memory into shared memory, synchronise, then perform fast computations on the shared data. Common uses include data reuse, inter-thread communication, and avoiding redundant global memory accesses.

**Local Memory** is not a separate physical memory but rather a portion of global DRAM used by the compiler to spill thread-private data that does not fit in registers (large arrays, spilled variables). It has the same high latency as global memory and is cached in L1/L2. Excessive local memory usage severely degrades performance and should be avoided by careful register usage.

**Global Memory** is the main device DRAM (e.g., HBM or GDDR) and is by far the largest memory pool (tens of GB). It is accessible by all threads across all blocks in the grid and persists across kernel launches. Latency is high (hundreds of cycles). Performance depends critically on coalesced access: when threads within a warp access consecutive addresses, the memory controller combines these into a single large transaction. Non-coalesced, scattered accesses significantly reduce effective bandwidth.

### **5\. GPU \- synchronization, warp, warp divergence, atomic operations.**

**Synchronization**

Synchronization on a GPU coordinates the execution order of threads and controls access to shared data to ensure correctness in parallel execution. The primary mechanism for intra-block synchronization is the barrier function, such as \_\_syncthreads() in CUDA. When threads within a block reach a barrier, they all wait until every thread in that block has arrived, and only then does execution continue. This ensures that preceding writes to shared memory by all threads are visible to subsequent reads.

**Warp**

A warp is the fundamental unit of thread scheduling and execution within a GPU Streaming Multiprocessor. A warp consists of a fixed number of threads — typically thirty-two — that share the same program counter and execute instructions in lockstep.

 

**Warp Divergence**

Warp divergence is a performance penalty that occurs when threads within the same warp take different execution paths due to a conditional branch, such as an if-else statement. Because all threads in a warp share one program counter and execute in lockstep, they must execute both paths sequentially.  

**Atomic Operations**

Atomic operations are hardware-supported operations that perform a read, modify, and write sequence on a memory location as a single, indivisible transaction. They guarantee that no other thread can observe or interfere with the intermediate state.

 

### **6\. GPU \- parallel patterns, parallel reduction, shfl\_down\_sync() function, asynchronous function execution.**

**Parallel Patterns**

Parallel patterns are recurring algorithmic templates that structure computation to efficiently exploit the massive parallelism of GPU architectures. The Map pattern applies an identical function independently to every element of a data set, with each thread processing one or more elements. This pattern is trivially parallel, requires no inter-thread communication, and achieves optimal throughput on GPUs.

**Parallel Reduction**

Parallel reduction takes an input array of N elements and computes a single aggregate result by repeatedly combining pairs of elements in a tree-structured manner. A naive implementation where all threads atomically update a single global accumulator destroys all parallelism through serialised contention.

**shfl\_down\_sync() Function**

The **shfl\_down\_sync()** function is a warp-level shuffle intrinsic available in CUDA, it enables threads within the same warp to read a register value from another thread without using shared memory or global memory. 

**Asynchronous Function Execution**

Asynchronous function execution on a GPU allows operations to be launched from the host CPU and run concurrently with host code or with other GPU operations, rather than blocking the host until completion. This is fundamental to achieving overlapping of computation, data transfer, and host processing, maximising overall system utilisation

### **7\. Apache Spark \- features, RDD, transformation functions.**

Apache Spark is a unified, distributed computing engine designed for large-scale data processing with high performance and ease of use. Spark provides a unified platform supporting diverse workloads including batch processing, SQL queries, machine learning via its MLlib library, and graph processing via GraphX. This eliminates the need to deploy separate engines for different processing needs.

 

**RDD (Resilient Distributed Dataset)**

The RDD is the foundational data abstraction of Spark. It refers to the fault-tolerance mechanism: rather than replicating data, the system logs the lineage of transformations that produced each RDD. Upon failure of a partition, Spark recomputes only the lost partition by replaying the transformation graph.

 

**Transformation Functions (Lazy)**

Transformations in Spark are operations applied to one or more RDDs that produce a new RDD. They include;

* **\`map\`:** Apply a function to each element (1-to-1).

* **\`filter\`:** Keep elements meeting a condition.

* **\`flatMap\`:** Produce zero, one, or many outputs per input (e.g., splitting a sentence into words).

* **\`reduceByKey\`:** Aggregate values by key (shuffle involved). (K, V1) \+ (K, V2) \= (K, F(V1, V2)).

* **\`groupByKey\`:** Group values by key. *Often less efficient than \`reduceByKey\`.*

* **\`join\`:** Join two RDDs of (K, V) and (K, W) to (K, (V, W)). Wide shuffle.

 

### **8\. Apache Spark \- accumulators, DataFrame, processing of streamed data.**

**Accumulators**

These are shared, mutable variables that can be "added to" by worker tasks in parallel. They are implemented as a write-only variable from executors; only the driver can read the final value.

* **Use case:** Counting corrupted records. Action failures don't affect accumulators, but lazy re-tries might cause double counting.

**DataFrame**

This is a distributed collection of data with named columns, built on top of RDDs but with a schema. Unlike RDDs which treat data as opaque objects, DataFrames carry type information and column names, enabling Spark to optimize query execution through its Catalyst optimiser.

**Processing of Streamed Data (Structured Streaming)**

Spark processes streamed data through Structured Streaming, which is a scalable, fault-tolerant stream processing engine built atop the Spark SQL engine. The fundamental abstraction is that a streaming computation is treated exactly like a batch computation operating on an unbounded, continuously appended table. New data arriving in the stream is treated as new rows appended to this logical table, and the user's query is applied incrementally.

 

### **9\. Apache Spark \- machine learning, classification algorithms, clustering, frequent patterns, TF-IDF.**

**Machine Learning Library (MLlib)**

Spark provides machine learning capabilities through its MLlib library, which is built on top of the DataFrame API and integrated with the Spark SQL engine. MLlib offers a unified set of high-level APIs for common machine learning tasks, enabling scalable training and inference on large datasets distributed across clusters. The library is designed around the concept of a machine learning pipeline, analogous to scikit-learn pipelines.

 

**Classification Algorithms**

Classification is a supervised learning task where the goal is to predict a categorical label for each input instance based on a set of features. Spark MLlib provides several classification algorithms suited to different data characteristics and scalability requirements.

Some of these algorithms are;

* **Logistic regression:** This is a model for binary and multinomial classification.  
* **Decision trees:** This performs classification by recursively partitioning the feature space into regions of homogeneous class labels based on information gain or Gini impurity.  
* **Support Vector Machines:** This algorithm finds the maximum-margin separating hyperplane between classes using a hinge loss formulation with L2 regularisation.

 

**Clustering**

Clustering is an unsupervised learning task that partitions a set of data points into groups such that points within the same group are more similar to each other than to points in other groups, revealing intrinsic structure without labelled training data.

**K-means** is the most widely used clustering algorithm in Spark. It partitions data into a predefined number of K clusters by iteratively assigning each point to the nearest centroid based on Euclidean distance and then recomputing centroids as the mean of all points assigned to that cluster.

 

**Frequent Pattern Mining**

Frequent pattern mining discovers items, subsequences, or structures that appear together in a dataset with a frequency exceeding a user-specified minimum support threshold. These techniques originate from market basket analysis but generalise to many domains.

 

**TF-IDF (Term Frequency – Inverse Document Frequency)**

Term Frequency-Inverse Document Frequency, or TF-IDF, is a numerical statistic that reflects the importance of a term to a document within a corpus. It is one of the most fundamental feature extraction methods in text analysis, converting raw text documents into fixed-length numerical vectors that machine learning algorithms can consume.

 

### **10\. Other parallel technologies \- Apache Kafka, Nvidia Jetson, TPU**

**Apache Kafka**

Apache Kafka is a distributed event streaming platform designed for high-throughput, low-latency, fault-tolerant handling of real-time data feeds. It is not a message queue in the traditional sense but a distributed commit log where records are persisted on disk and replicated across multiple brokers for durability.

* **Use Case:** Kafka is widely used for real-time event sourcing, log aggregation, metrics collection, messaging between microservices, change data capture from databases, and as a backbone for big data pipelines feeding into systems like Spark Streaming.

 

**NVIDIA Jetson**

Nvidia Jetson is a family of embedded computing platforms designed for edge AI and autonomous machines. It integrates a high-performance GPU, a multi-core ARM CPU, memory, and specialised hardware accelerators on a compact, power-efficient module suitable for deployment in robots, drones, smart cameras, industrial systems, and IoT gateways.

 

**TPU (Tensor Processing Unit)**

The Tensor Processing Unit is a custom application-specific integrated circuit developed by Google specifically to accelerate tensor computations central to machine learning workloads, particularly the matrix multiplication operations that dominate neural network training and inference. Unlike general-purpose CPUs and GPUs, TPUs are designed from the ground up as domain-specific architectures, trading programmability for peak throughput and energy efficiency on tensor operations.

1\) Parallelism \- utilization, parallel technologies.

2\) CPU \- design of parallel program, threads and processes, data synchronization (Lock, RLock, Semaphore).

3\) GPU \- relationships between threads, blocks, and the grid, characteristics of Streaming Multiprocessor.

4\) GPU \- memories \- speed, size, usage (thread, block, grid).

5\) GPU \- synchronization, warp, warp divergence, atomic operations.

6\) GPU \- parallel patterns, parallel reduction, shfl\_down\_sync() function, asynchronous function execution.

7\) Apache Spark \- features, RDD, transformation functions.

8\) Apache Spark \- accumulators, DataFrame, processing of streamed data.

9\) Apache Spark \- machine learning, classification algorithms, clustering, frequent patterns, TF-IDF.

10\) Others parallel technologies \- Apache Kafka, Nvidia Jetson, TPU.

## **MPA SKS**

### **1\. Communication System Services & Signalling**

**General Analysis of Services**

Communication services enable information transfer between users and devices, they can be connection-oriented or connectionless and can be classified by type: voice, data, video, multimedia.

**SS7 (Signalling System No. 7\)**

Signalling System No. 7 is a global standard for telecommunication network signalling, it is used for call setup, management, teardown, and advanced services in PSTN/mobile networks.

**Its key features include;**

* Out-of-band signalling (separate channel from voice/data).  
* High-speed packet-switched network.

**Its functions are;**

Call control, SMS, number translation, prepaid billing, local number portability, roaming (in GSM/UMTS).

**Architecture components:** 

* SSP (Service Switching Point),   
* STP (Signal Transfer Point),   
* SCP (Service Control Point).

**TMN (Telecommunication Management Network)**

Telecommunication Management Network is   for managing telecom networks and services. It provides a structured, layered approach to network management. Its goal is to provide interoperability between multi-vendor equipment and consistent OSS/BSS.

**It has four functional layers:**

* Business Management  
* Service Management  
* Network Management  
* Element Management

**It relies on FCAPS model:**

Fault, Configuration, Accounting, Performance, Security.

**Telecom Services – Economic View**

**Key characteristics:**

* Economies of scale and scope (high fixed costs, low marginal costs).  
* Network effects (value increases with more users).  
* Externality effects and public good aspects in universal service.  
* Natural monopoly tendencies in infrastructure.

### **2\. ISDN (Integrated Services Digital Network)**

Integrated Services Digital Network is a digital network standard for providing integrated voice, data, and video services over existing copper telephone lines. It has a faster call setup, higher quality, simultaneous services. It uses a separate B-channels for user data/voice and D-channel for signalling and control.

**ISDN Subscriber Line Reference Model**

ISDN Subscriber Line Reference Model defines functional grouping and reference points

**Functional groups:**

* TE1 – ISDN-compatible terminal equipment.  
* TE2 – Non-ISDN terminal (needs TA).  
* TA – Terminal Adapter (converts TE2 to ISDN).

**Reference points:**

* R – Boundary between TE2 and TA.  
* S – Boundary between TE1/TA and NT2.  
* T – Boundary between NT2 and NT1.  
* U – Boundary between NT1 and LT (local loop/two-wire).  
* V – Boundary between LT and ET (inside the exchange).


**Basic and Primary Access**

**Basic Rate Access (BRA / BRI):** It is typically used for residential and small business use. It includes 2 × B-channels (64 kbps each) \+ 1 × D-channel (16 kbps) \= 2B+D. It has a total gross bit rate: 192 kbps (including framing/synchronisation). 

**Primary Rate Access (PRA / PRI):** It is used by larger organisations (PBX, businesses). It includes ETSI/Europe (E1 standard) has 30 × B-channels \+ 1 × D-channel (64 kbps) \= 30B+D, ANSI/North America (T1 standard) has 23 × B-channels \+ 1 × D-channel (64 kbps) \= 23B+D. 

 

**Frame Structure at S and U Interfaces**

* **S Interface (4-wire):** 48 bits per 250 µs frame (192 kbit/s). Contains two B channels (8 bits each), D channel bits, framing (F), and DC balancing (L) bits.

* **U Interface (2-wire):** Uses **Echo Cancellation** to achieve full-duplex transmission on a single pair. Uses 2B1Q (2 Binary, 1 Quaternary) line code (4 voltage levels, 2 bits per symbol). A frame consists of 120 quaternary symbols (240 bits) structured in a 1.5 ms superframe, carrying 12B+D overhead, sync, maintenance.

 

**Terminal Power Supply**

ISDN provides the possibility of phantom power feeding across the S/T interface.

* **Power Source 1 (PS1):** Normal power from the NT1, can power a single terminal during mains failure (restricted mode, limited to 420 mW).  
* **Power Source 2 (PS2):** Power from a local power supply at the terminal.

PS1 is only used in emergencies (restricted terminal functions).

### **3\. ATM (Asynchronous Transfer Mode)**

Asynchronous Transfer Mode is a cell-switching, connection-oriented network technology for high-speed data, voice, and video transmission. It is designed to unify LAN/WAN/voice networks under one infrastructure

**Its key features are;**

* Asynchronous time-division multiplexing (statistical multiplexing).  
* Supports guaranteed Quality of Service (QoS). 

**ATM Cell**

The ATM cell has a fixed size of about 53 bytes with the header having 5-byte and payload 48-byte.

 

**Synchronization**

The ATM is **asynchronous** in the sense that cells are not transmitted to or from a user at a fixed, repetitive time slot, instead, cells fill variable bit rates as needed and synchronization is maintained via cell delineation using the Header Error Control (HEC)

 

**Virtual Path and Virtual Channel**

* A **Virtual Channel (VC)** is a logical unidirectional connection for carrying cells between two endpoints. Identified by a **VCI (Virtual Channel Identifier)** 

* A **Virtual Path (VP)** is a bundle of VCs that share the same route between two switches. Identified by a **VPI (Virtual Path Identifier)** .

* **VPI \+ VCI** uniquely identifies a connection on an interface. Swapping these labels in the switch performs cell switching (similar to MPLS label swapping).

 

**ATM Layer Model**

The ATM uses a simplified protocol model, it has three planes;

* **User Plane:** To transfer user data, flow control, error handling.  
* **Control Plane**: For connection control, call setup/release signalling.  
* **Management Plane**: For layer and plane management (OAM, coordination).

It has four layers which are;

* **AAL (ATM Adaptation Layer):** Segments/reassembles variable-length upper-layer packets into 48-byte SAR (Segmentation And Reassembly) payloads.  
* **ATM Layer:** 5-byte header multiplexing, VPI/VCI switching.  
* **Physical Layer:** Transmission convergence (framing, cell delineation).

 

**ATM Network Elements**

* **ATM End System:** Originates or terminates ATM connections;

* **ATM Switch:** Switches cells based on VPI/VCI, performs header translation, traffic policing and shaping

* **Cross-connect:** VP level cross-connection, typically semi-permanent

### **4\. xDSL (Digital Subscriber Line)**

xDSL is a family of technologies for providing high-speed digital data transmission over existing copper twisted-pair telephone lines. It has different variants: HDSL, ADSL, SDSL, VDS.

* **HDSL (High bit-rate DSL):** Has symmetric transmission and designed as a replacement for T1/E1 lines without repeaters..  
* **ADSL (Asymmetric DSL):** This is most popular for consumers, it has a higher downstream than upstream.

 

**ADSL Reference Model**

* **ATU-C (ADSL Transceiver Unit – Central office):** Modem at the operator's DSLAM (Digital Subscriber Line Access Multiplexer).

* **ATU-R (ADSL Transceiver Unit – Remote):** Modem at the customer premises (CPE).

* **Splitter:** Low-pass filter (POTS/ISDN) separates baseband voice from high-frequency ADSL data on the same copper pair. Eliminates interference between phone and modem.

 

**Modulation (ADSL)**

* **DMT (Discrete Multi-Tone):** This is the dominant modulation in ADSL, it divides available bandwidth into many narrow sub carriers with each subcarrier modulated independently using QAM.

* **CAP (Carrierless Amplitude/Phase Modulation)**: This is an older single carrier method, it is less flexible against frequency-selective noise/crosstalk.

 

**Interference and Crosstalk**

These are unwanted signals degrading xDSL performance, they reduce SNR per sub carrier and can be stopped by correction coding, impulse noise protection etc. Sources includes Radio Frequency Interference, Background/thermal noise, Single-frequency tones from nearby equipment

 

### **5\. IPv6, QoS & OSI vs. TCP/IP**

### IPv6 is the next-generation network layer protocol designed to succeed IPv4 by addressing its fundamental limitations while providing enhanced functionality. The defining characteristic is the vastly expanded address space using 128 bit addresses, effectively eliminating address scarcity. Addresses are written as eight colon-separated groups of four hexadecimal digits, with leading zeros and a single longest run of zero groups compressible.

 IPv6 fixed the address exhaustion of IPv4, it restores end-to-end connectivity, and natively supports better QoS mechanisms via the **Flow Label** and Traffic Class fields in the header.

* It has 128-bit addresses allowing for \~3.4×10³⁸ addresses  
* It uses SLAAC for autoconfiguration instead of DHCP  
* It has native support for authentication and encryption

**QoS (Quality of Service)**

QoS is the ability of the network to provide different priority and guaranteed performance to different applications/traffic flows.

**Key QoS parameters:**

* **Bandwidth/Throughput:** Minimum guaranteed or peak rate.  
* **Delay (Latency):** End-to-end transfer time.  
* **Jitter:** Variation in packet delay (critical for real-time traffic).  
* **Packet Loss Rate:** Acceptable loss ratio.


**OSI Reference Model vs. TCP/IP Architecture**

 

**OSI:** This is a theoretical, prescriptive reference model, it is mostly used as a teaching and standardization tool. 

**Physical Layer:** For bit transmission

**Data Link Layer:** For framing, MAC, error detection.

**Network Layer:** For routing, logical addressing.

**Transport Layer:** For reliable end-to-end delivery, segmentation.

**Session Layer:** For synchronisation.

**Presentation Layer:** For data translation, encryption, compression.

**Application Layer:** For Network services to applications.

**TCP/IP:** A de-facto standard, practical and descriptive of what was actually implemented. The internet runs TCP/IP.

**Network Access/Link Layer:** Equivalent to OSI Physical \+ Data Link.

**Internet Layer:** Corresponds to OSI Network (IP, ICMP, ARP).

**Transport Layer:** Matches OSI Transport (TCP, UDP).

**Application Layer:** Combines OSI Session, Presentation, Application (HTTP, SMTP, FTP, DNS).

 

### **6\. PON (Passive Optical Network)**

**PON:** Passive Optical Network is a  point-to-multipoint fiber access network architecture that uses **unpowered (passive)** optical splitters/combiners to serve multiple endpoints from a single optical fiber.

**Key elements:**

* **OLT (Optical Line Terminal):** At the central office.  
* **ONU/ONT (Optical Network Unit / Terminal):** Near or at the subscriber.  
* **Optical splitter:** Divides signal to multiple users (e.g., 1:32, 1:64).

**Benefits:** lower power consumption, reduced maintenance, high bandwidth, long reach (\~20 km typical).

 

**Network Topology and Communication Methods**

PON uses a Tree-and-branch architecture. Both communication methods uses TDM.

* **Downstream (OLT → ONUs):** All ONUs receive the same signal through broadcast transmission. Security is through encryption (AES), and each ONU extracts only its own frames

* **Upstream (ONUs → OLT):** Each ONU is assigned a specific timeslot by the OLT to transmit. ONU turns its laser on only during its assigned slot. This requires precise ranging and timing to avoid collisions.

 

### **7\. Development of PON (Physical & Transport Layers)**

* **APON/BPON (ITU-T G.983):** ATM-based with data rate of 55–622 Mbps downstream/upstream

* **EPON (IEEE 802.3ah):** This has 1 Gbps symmetric 

* **GPON (ITU-T G.984):** This has 2.488 Gbps downstream / 1.244 Gbps upstream with higher split ratios (1:64, 1:128) 

* **XG-PON (10G-PON) (ITU-T G.987):** This has 10 Gbps downstream / 2.5 Gbps upstream

* **XGS-PON (ITU-T G.9807):** This has 10 Gbps symmetric (down/up)

* **NG-PON2 (ITU-T G.989):** This has TWDM-PON (multiple 10G wavelengths), up to 40–80 Gbps aggregate

### **8\. Activation Process of the End Unit in GPON**

The activation process for an end unit (ONU/ONT) in a GPON network is a standardized procedure to bring an unregistered unit into full operation through a sequence of well-defined states. These states are;

* **Initial State (O1):** The ONU powers up and recovers the downstream optical signal. Once achieved, it moves to the next state .  
* **Standby State (O2):** The ONU listens for and receives network configuration parameters, including the upstream overhead structure. It synchronises with the OLT .  
* **Serial Number State (O3):** The OLT discovers new ONUs by broadcasting a serial number request. The ONU responds with its unique 8-byte serial number .  
* **Ranging State (O4)**: The OLT measures the physical distance to the ONU. It calculates and assigns an equalization delay (EqD) so the unit's upstream transmissions align perfectly with other ONUs on the network .  
* **Operation State (O5)**: The ONU is fully activated and synchronized. It can now transmit user data to the OLT and receive traffic, handling internet, voice, or video services

### **9\. Integer Programming in Networks**

**Integer Programming (IP) in Networks**

Integer programming (IP) is a mathematical optimization technique where some or all variables are restricted to integer values. It is widely used in network design and operation for problems involving discrete decisions.

**Key applications are:**

* **Network topology design:** selecting node locations, link placements (e.g., where to place routers/switches).  
* **Routing and traffic engineering:** finding optimal paths subject to capacity, delay, or reliability constraints.  
* **Resource allocation:** wavelength assignment in WDM, frequency/channel allocation in wireless.  
* **Network survivability:** spare capacity placement and backup path selection for failure recovery.

 

**Network as a Graph**

In communication, network is modeled as a directed or undirected graph **G(V, E)**, where;

* **V (Vertices/Nodes):** Routers, switches, OLTs, etc.  
* **E (Edges/Links):** Cables, fibers, wavelengths, microwave hops.  
* **Edge weights:** Parameters like **capacity** (bandwidth), **cost** (price per MHz), **delay**, or **distance**.

 

**Load Distribution from the Viewpoint of Transmission Price**

To minimize total cost *C*, where the cost of each link e is a function of its load l(e), Linear Programming(LP) is used.

**Transmission price** refers to the cost incurred to send traffic over a link or path (monetary cost, administrative weight, or resource consumption).

**Load distribution objective**: To distribute traffic demands across the network to minimise total transmission cost while respecting capacity constraints.

### **10\. IP over WDM & RWA**

**WDM (Wavelength Division Multiplexing)**

WDM (Wavelength Division Multiplexing) transmits multiple optical carriers (wavelengths/lambdas) simultaneously over a single optical fibre. It can be grouped into;

* **CWDM (Coarse WDM):** Up to 18 channels, spaced far apart (20 nm channels in bands 1270–1610 nm). Low cost, simple optics (uncooled lasers), reach \~80 km. For access/metro.  
* **DWDM (Dense WDM):** 40, 80, 96+ channels, tightly spaced (100 GHz, 50 GHz, or 25 GHz spacing, i.e., 0.8 nm, 0.4 nm, 0.2 nm). It uses C-band, and has a high capacity and cost.

 

**TDM vs. WDM**

* **TDM (Time Division Multiplexing):** TDM divides a single wavelength or transmission resource into time slots, with multiple data streams sharing the channel sequentially. Each stream gets the full channel bandwidth but only for a fraction of time. Capacity increase comes from raising the bit rate (e.g., 2.5 → 10 → 100 Gbps), which eventually meets electronic processing limits and signal degradation challenges.

* **WDM (Wavelength Division Multiplexing):** WDM divides the optical spectrum into multiple independent wavelengths transmitted simultaneously on the same fibre. Each wavelength operates as a separate communication channel, and capacity increases by adding more wavelengths without raising **the** per-wavelength bit rate. This multiplies total fibre capacity while keeping per-channel electronics manageable.

 

**RWA (Routing and Wavelength Assignment)**

This is a fundamental problem in WDM networks when establishing lightpaths (optical circuits) for traffic demands.

**The two sub-problems are:**

* **Routing:** find a physical path (fibre links) from source to destination node.  
* **Wavelength Assignment:** select a specific wavelength that is free and continuous along all links of the chosen path.

**Common solution approaches:**

* **Routing:** Fixed routing (shortest path), fixed-alternate routing (set of precomputed paths), adaptive routing.  
* **Wavelength assignment heuristics:** First-Fit (most common, low complexity), Least-Used, Most-Used, Random, Max-Sum.

1. Communication system services   
   1. General analysis  
   2. Signalling system SS7  
   3. Telecommunication Management Network \- TMN  
   4. Telecommunication services from the economic point of view.  
        
2. Integrated Services Digital Network  
   1. ISDN, basic and primary access  
   2. ISDN subscriber line reference model  
   3. Frame structure at the S and U interfaces  
   4. Terminal power supply.  
3. Asynchronous Transfer Mode ATM,   
   1. ATM cell  
   2. Synchronization  
   3. Virtual path and virtual channel  
   4. Classes of services  
   5. ATM layer model  
   6. ATM network elements.  
4. Digital subscriber connection xDSL, HDSL, ADSL  
   1. Reference model  
   2. Modulation  
   3. Interference  
   4. Crosstalk.  
5. IPv6, a continuation of IPv4  
   1. QoS Quality of Service  
   2. OSI reference model versus TCP/IP network architecture.  
6. Passive optical networks PON  
   1. Network topology, and communication methods.  
   2. The development of PON and their differences from the point of view of the physical and transport layers.  
7. Activation process of the end unit in the GPON (Gigabit PON) network.  
8. Use of integer programming in contemporary networks  
   1. Network as a graph, and load distribution from the point of view of transmission price.  
9. IP transmission over   
   1. Wavelength Division Multiplexing (WDM) network  
   2. CWDM  
   3. DWDM  
   4. TDM versus WDM  
   5. Routing and Wavelength Assignment (RWA).


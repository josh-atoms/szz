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

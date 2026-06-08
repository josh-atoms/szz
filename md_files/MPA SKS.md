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
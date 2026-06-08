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


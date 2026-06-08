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

 


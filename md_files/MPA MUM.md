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


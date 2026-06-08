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
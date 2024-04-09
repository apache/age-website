import * as React from 'react';
import Layout from "../../components/Layout";

import "../../components/styles/FAQ.scss"; // SCSS 파일 임포트

// FAQ 컴포넌트 수정
class FAQ extends React.Component {
  state = {
    openItemId: null,
  };

  toggleItem = (id) => {
    this.setState((prevState) => ({
      openItemId: prevState.openItemId === id ? null : id
    }));
  };

  render() {

    const faqData = [
      { id: 1, question: 'Q 1 : What is the graph database, and how is it different from the relational database?', 
      answer: () => (
        <>
          <p>A graph database is a specialized type of database designed for storing, managing, and querying highly interconnected data more efficiently than traditional databases. Unlike relational databases that store data in tables with rows and columns, graph databases use graph structures comprising nodes (entities), edges (relationships), and properties (attributes) to represent and store data.</p>
          <p>The main differences between graph databases and relational databases include:</p>
          <p><strong>Data Structure:</strong> Graph databases utilize nodes and edges to represent entities and their relationships, facilitating direct storage of relationship data. Relational databases use tables, where relationships are inferred through joins.</p>
          <p><strong>Query Performance:</strong> Graph databases excel in scenarios requiring extensive traversal of relationships, making them ideal for complex networks like social networks, recommendation engines, and more. Relational databases can struggle with performance as the complexity and volume of relationships increase.</p>
          <p><strong>Schema Flexibility:</strong> Graph databases often offer more flexibility with schema-less designs, allowing easier modification of the data model. Relational databases typically require a predefined schema, making alterations more challenging.</p>
          <p>Apache AGE extends PostgreSQL, enabling it to function as a graph database. This allows users to leverage graph database capabilities within a familiar relational database environment, offering the best of both worlds: the robustness and ACID compliance of PostgreSQL with the flexibility and relationship-handling prowess of graph databases.</p>
        </>
      ),
    }
    ,

      { id: 2, question: 'Q 2 : What is the best way for someone to get started with Apache AGE? Are there any recommended resources or tutorials which you could recommend for a comprehensive introduction?', 
      answer: () => (
        <>
          <p>The best way to start with Apache AGE is by exploring the official documentation on the Apache AGE website.</p>
          <p>For a comprehensive introduction, visit the Apache AGE documentation and the GitHub repository for in-depth guides, examples, and community resources.</p>
        </>
      ),
    },

      { id: 3, question: 'Q 3 : How does the integration of Apache AGE with PostgreSQL benefit developers and organizations?',
      answer: () => (
        <>
          <p>The integration of Apache AGE with PostgreSQL offers developers and organizations the ability to manage both graph and relational data within a single, powerful database system.</p>
          <p>This facilitates complex data analyses and relationships with the efficiency and reliability of PostgreSQL.</p>
        </>
      ),
    },
    
      { id: 4, question: 'Q 4 : Is Apache AGE compatible with all PostgreSQL versions?',
      answer: () => (
        <>
          Apache AGE is compatible with PostgreSQL versions up to 16. Please check 
          <a href="https://github.com/apache/age/releases" target="_blank" rel="noopener noreferrer"> the releases on GitHub</a>.
        </>
      ),
    },

      { id: 5, question: 'Q 5 : What is the reason for people to use Apache AGE when there are other graph databases?', 
      answer: () => (
        <>
          <p>People use Apache AGE for its seamless integration with PostgreSQL, allowing them to leverage graph database capabilities alongside relational data within a familiar SQL environment, without the need to adopt a separate graph database system.</p>
        </>
      ),
    },

      { id: 6, question: 'Q 6 : What query language does Apache AGE use for graph operations?', 
      answer: () => (
        <>
        openCypher
        </>
      ),
    },

      { id: 7, question: 'Q 7 : Do I need to pay to use Apache AGE?', 
      answer: () => (
        <>
          <p>Apache AGE is an open source project and free to use.</p>
          <p>But there are some vendors providing commercial support such as AGEDB in Canada.</p>
        </>
      ),
    },

    { id: 8, question: 'Q 8 : How can I install Apache AGE?',
      answer: () => (
        <>
          Source codes and binaries are available at 
          <a href="https://github.com/apache/age/releases" target="_blank" rel="noopener noreferrer">GitHub</a>. 
          <a href="https://hub.docker.com/r/apache/age" target="_blank" rel="noopener noreferrer">Docker Hub</a>. 
          Please refer to 
          <a href="https://age.apache.org/age-manual/master/intro/overview.html" target="_blank" rel="noopener noreferrer">the official AGE manual</a> for more details.
        </>
      ),
    },
    

      { id: 9, question: 'Q 9 : How does Apache AGE stand out compared to other similar tools?', 
      answer: () => (
        <>
        <p>Apache AGE stands out by integrating graph database capabilities directly into PostgreSQL, allowing users to manage graph and relational data within the same database system. </p>
        <p>This unique approach offers the robustness, scalability, and familiarity of PostgreSQL while enabling complex graph queries and analyses without the need for separate graph database solutions.</p>
        </>
      ),
    },
    

      { id: 10, question: 'Q 10 : Could you provide instances of industries wherein Apache AGE could be utilized?', 
      answer: () => (
        <>
          <p>pache AGE is beneficial in industries like social networking, for analyzing relationships; finance, for fraud detection and customer insights; healthcare, for patient data and relationships; telecommunications, for network infrastructure management; and logistics, for route optimization and supply chain analysis.</p>
          </>
      ),
    },

      { id: 11, question: 'Q 11 : How often is Apache AGE updated, and how can I stay informed about new releases?'
      ,answer: () => (
        <>
          <p>Apache AGE updates vary based on development progress and community contributions.</p>
          <p>To stay informed about new releases, follow the Apache AGE project on GitHub, subscribe to their mailing list, or join their community forums.</p>
        </>
      ),
    },

      { id: 12, question: 'Q 12 : Is there a community or support forum for Apache AGE?', 
      answer: () => (
        <>
          <p>Apache AGE GitHub</p>
          <p><a href="https://github.com/apache/age/discussions">Discussions</a></p>
          <p><a href="https://github.com/apache/age/issues">Issues</a></p>
          <p>mailing lists:</p> 
          <p><a href="mailto:dev@age.apache.org">dev@age.apache.org</a></p>
          <p><a href="mailto:users@age.apache.org">users@age.apache.org</a></p>
        </>
      ),
    },

      { id: 13, question: 'Q 13 : How can I contribute to the development of Apache AGE?',
      answer: () => (
        <>
          Please refer to <a href="https://age.apache.org/contribution/how" target="_blank" rel="noopener noreferrer">the contribution guidelines</a>.
        </>
      ),
    },
    
      { id: 14, question: 'Q 14 : Is there any ongoing research or development related to features or capabilities of Apache AGE?',
      answer: () => (
        <>
          <p>Yes, being an open-source project, Apache AGE benefits from a vibrant community of dedicated developers who are passionate about using their skills to improve its features and capabilities. This collaborative environment fosters continuous research and development efforts focused on enhancing the functionality of Apache AGE and addressing emerging needs in the GDB field. With contributors from various backgrounds using their expertise to innovate and improve the platform, Apache AGE continuously evolves itself, granting users access to cutting-edge innovations and expanded functionalities for graph-based data management and analysis.</p>
        </>
      ),
    },  

      { id: 15, question: 'Q 15 : Does Apache AGE support ACID(Atomicity, Consistency, Isolation, and Durability) transactions?',
      answer: () => (
        <>
          <p>Yes, Apache AGE supports ACID transactions for Graph, Relational and JSON Document.</p>
        </>
      ),
    },  

      { id: 16, question: 'Q 16 : Are there any limitations to the size or scale of graphs that Apache AGE can handle?',
      answer: () => (
        <>
          <p>Yes. The capacity for both vertices and edges is 281474976710655. This limitation only applies to one particular graph. AGE allows creating multiple graphs.</p>
        </>
      ),
    },  

        { id: 17, question: 'Q 17 : How does Apache AGE handle indexing and optimization for graph queries?',
      answer: () => (
        <>
          <p>AGE uses PostrgreSQL's indexes. It stores properties of elements (vertices and edges) as a custom type called "agtype". The structure of properties is comparable to JSON objects. Therefore, properties can be indexed in a similar way a "JSONB" column is indexed. For example, BTree, Hash and GIN etc. indexes are supported.</p>
        </>
      ),
    },  

        { id: 18, question: 'Q 18 : Can Apache AGE be used alongside other PostgreSQL extensions?',
      answer: () => (
        <>
          <p>Yes. AGE uses its own namespace for tables, functions, and other database objects to avoid potential conflicts. Cypher queries are invoked by the "cypher()" function which returns a set of rows. The column values of those rows are usually in "agtype". AGE provides the functionality to cast "agtype" to a PostgreSQL type in most cases. So, AGE can be used together with other extensions.</p>
        </>
      ),
    },  

        { id: 19, question: 'Q 19 : Does Apache AGE provide support for data replication and synchronization in distributed environments?',
      answer: () => (
        <>
          <p>Apache AGE has been tested with Citus. Due to inherited tables not being supported by Citus, Apache AGE tables cannot be distributed with Citus yet. However, it may be supported in future.</p>
        </>
      ),
    },  

        { id: 20, question: 'Q 20 : Are there any known interoperability issues between Apache AGE and other PostgreSQL extensions or tools?',
      answer: () => (
        <>
          <p>No interoperability issue has been reported so far.</p>
        </>
      ),
    },  
        
      // 여기에 추가 질문과 답변을 넣을 수 있습니다.
    ];
    const { openItemId } = this.state;


    return (
        <div>
          {faqData.map(({ id, question, answer }) => (
            <div key={id} className="faq-item">
              <div
                className={`accordion-header ${openItemId === id ? 'active' : ''}`}
                onClick={() => this.toggleItem(id)}
              >
                {question}
              </div>
              <div
                className={`accordion-content ${openItemId === id ? 'open' : 'closed'}`}
              >
                {typeof answer === 'function' ? answer() : answer}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }


// FAQIndexPage 컴포넌트 수정
export default class FAQIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
              backgroundColor: "rgb(184, 20, 90)",
              color: "white",
              padding: "1rem",
              textAlign: "center"
            }}
          >
            Frequently Asked Questions
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="faq-content-page">
            <br></br>
            <h2>Thank you for visiting our FAQ page. If you can't find the question you're looking for, please leave your comments or questions in the 
                <strong><a href="https://github.com/apache/age/issues" target="_blank"> issues</a></strong> or 
                <strong><a href="https://github.com/apache/age/discussions" target="_blank"> discussions</a></strong> section on the 
                <strong><a href="https://github.com/apache/age" target="_blank"> Apache AGE GitHub page</a></strong>. We look forward to hearing from you.
            </h2><hr></hr>
                <br></br>
              <FAQ />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

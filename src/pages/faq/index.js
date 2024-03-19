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
      { id: 1, question: 'What is the graph database, and how is it different from the relational database?'
      , answer: 'A graph database is a specialized type of database designed for storing, managing, and querying highly interconnected data more efficiently than traditional databases. Unlike relational databases that store data in tables with rows and columns, graph databases use graph structures comprising nodes (entities), edges (relationships), and properties (attributes) to represent and store data. The main differences between graph databases and relational databases include: Data Structure: Graph databases utilize nodes and edges to represent entities and their relationships, facilitating direct storage of relationship data. Relational databases use tables, where relationships are inferred through joins. Query Performance: Graph databases excel in scenarios requiring extensive traversal of relationships, making them ideal for complex networks like social networks, recommendation engines, and more. Relational databases can struggle with performance as the complexity and volume of relationships increase. Schema Flexibility: Graph databases often offer more flexibility with schema-less designs, allowing easier modification of the data model. Relational databases typically require a predefined schema, making alterations more challenging. Apache AGE extends PostgreSQL, enabling it to function as a graph database. This allows users to leverage graph database capabilities within a familiar relational database environment, offering the best of both worlds: the robustness and ACID compliance of PostgreSQL with the flexibility and relationship-handling prowess of graph databases.' },

      { id: 2, question: 'What is the best way for someone to get started with Apache AGE? Are there any recommended resources or tutorials which you could recommend for a comprehensive introduction?'
      , answer: 'The best way to start with Apache AGE is by exploring the official documentation on the Apache AGE website. For a comprehensive introduction, visit the Apache AGE documentation and the GitHub repository for in-depth guides, examples, and community resources.' },

      { id: 3, question: 'How does the integration of Apache AGE with PostgreSQL benefit developers and organizations?'
      , answer: 'The integration of Apache AGE with PostgreSQL offers developers and organizations the ability to manage both graph and relational data within a single, powerful database system, facilitating complex data analyses and relationships with the efficiency and reliability of PostgreSQL.' },

      { id: 4, question: 'Is Apache AGE compatible with all PostgreSQL versions?'
      , answer: 'Apache AGE is compatible with PostgreSQL versions up to 16. Please check https://github.com/apache/age/releases.' },

      { id: 5, question: 'What is the reason for people to use Apache AGE when there are other graph databases?'
      , answer: 'People use Apache AGE for its seamless integration with PostgreSQL, allowing them to leverage graph database capabilities alongside relational data within a familiar SQL environment, without the need to adopt a separate graph database system.' },

      { id: 6, question: 'What query language does Apache AGE use for graph operations?'
      , answer: 'openCypher' },

      { id: 7, question: 'Do I need to pay to use Apache AGE?'
      , answer: 'Apache AGE is an open source project and free to use. But there are some vendors providing commercial support such as AGEDB in Canada.' },

      { id: 8, question: 'How can I install Apache AGE?'
      , answer: 'Source codes and binaries are available at https://github.com/apache/age/releases.https://hub.docker.com/r/apache/age.Please refer to https://age.apache.org/age-manual/master/intro/overview.html' },

      { id: 9, question: 'How does Apache AGE stand out compared to other similar tools?'
      , answer: 'Apache AGE stands out by integrating graph database capabilities directly into PostgreSQL, allowing users to manage graph and relational data within the same database system. This unique approach offers the robustness, scalability, and familiarity of PostgreSQL while enabling complex graph queries and analyses without the need for separate graph database solutions.' },

      { id: 10, question: 'Could you provide instances of industries wherein Apache AGE could be utilized?'
      , answer: 'Apache AGE is beneficial in industries like social networking, for analyzing relationships; finance, for fraud detection and customer insights; healthcare, for patient data and relationships; telecommunications, for network infrastructure management; and logistics, for route optimization and supply chain analysis.' },

      { id: 11, question: 'How often is Apache AGE updated, and how can I stay informed about new releases?'
      , answer: 'Apache AGE updates vary based on development progress and community contributions. To stay informed about new releases, follow the Apache AGE project on GitHub, subscribe to their mailing list, or join their community forums.' },

      { id: 12, question: 'Is there a community or support forum for Apache AGE?'
      , answer: 'GitHub dicussion and Issues, mailing lists: dev@age.apache.org, users@age.apache.org' },

      { id: 13, question: 'How can I contribute to the development of Apache AGE?'
      , answer: 'Please refer to https://age.apache.org/contribution/how' },

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
                {answer}
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
            <div className="content">
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

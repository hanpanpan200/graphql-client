import { useQuery, gql } from '@apollo/client';
import logo from './logo.svg';
import './App.css';

const GET_PAGE_CONFIG = gql`
  query GetPosts {
    posts {
      title
      content
      author {
        name
        dob
        location {
          name
        }
      }
    }
    header {
      text
      priority
      position
    }
    footer {
      text
      position
    }
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_PAGE_CONFIG);
  const { header, footer, posts } = data || {};
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{ header ? header.text : 'N/A' }</h1>
        <section>
          <p>loading: {loading ? 'Yes' : 'No'}</p>
          <p>error: { error ? error : 'N/A' }</p>
          { posts &&
            <div className="post-container">
              <h2>Posts</h2>
              {posts.map(post => <div key={post.title} className="post-item-wrapper">
                <span className="post-field">Title: <span>{post.title}</span></span>
                <span className="post-field">Content: <span>{post.content}</span></span>
              </div>)}
            </div>
          }
          <button onClick={() => refetch()}>Refresh</button>
        </section>
        <footer>
          Footer: { footer ? footer.text : 'N/A' }
        </footer>
      </header>
    </div>
  );
}

export default App;

import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const getPostById = useStoreState((state) => state.getPostById);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const post = getPostById(id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatePost);
        navigate(`/post/${id}`);
      }

    return (
        <main className="NewPost">
        <h2>New Post</h2>
        {editTitle &&
        <>
            <form className="newPostForm" onSubmit={e => e.preventDefault()}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    required
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea
                    id="postBody"
                    required
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => handleEdit(post.id)}
                >
                    Submit
                </button>
            </form>
            </>
        }
        {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to="/">Visit Our Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost
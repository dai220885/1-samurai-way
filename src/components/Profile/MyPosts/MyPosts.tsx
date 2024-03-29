import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import {Button} from '../../Button/Button';
import {PostType,} from '../../../redux/profile-reducer';
import {AddPostFormDataType, AddPostReduxForm} from '../AddPostForm/AddPostForm';
//import {ActionsType} from '../../../redux/store';

type MyPostsPropsType = {
	posts: PostType[]
	// newPostText: string
	//dispatch: (action: ActionsType) => void
	addNewPost: (newPost: string) => void
	removePost: (id: string) => void
	//setNewPostText: (newPostText: string) => void
	// inputTitle: string
	// inputSetTitle: (inputTitle: string) => void;
}


const MyPosts = React.memo((props: MyPostsPropsType) => {
	console.log('MyPosts component rendered')
	//let [title, setTitle] = useState('') //стейт для хранения введенного текста в textArea

	let postsElements = props.posts.map((post) => {
		//let removePostOnClickHandler = () => props.removePost(post.id)
		//let action = {type: 'REMOVE-POST', postForRemoveId: post.id};//объект, который передаем методу dispatch
		//let removePostOnClickHandler = () => props.dispatch(removePostActionCreator(post.id))
		let removePostOnClickHandler = () => props.removePost(post.id)
		return (
			<div key={post.id}>
				<Post message={post.message} likeCount={post.likeCount}/>
				<Button name={'-'} onClick={removePostOnClickHandler}/>
			</div>
		)
	})
	const addNewPostHandler = (formData: AddPostFormDataType) => {
		//props.addNewPost();
		//let action = {type: 'ADD-POST'};//объект, который передаем методу dispatch
		//props.dispatch(addPostActionCreator());
		props.addNewPost(formData.newPost);

		//setTitle('')
	}
	// const setNewPostTextHandler = (newPostText: string) => {
	//     //     //debugger
	//     //     props.setNewPostText(newPostText)
	//     // }
	return (
		<div className={classes.postBlock}>
			<h3>My posts</h3>
			{/*<div>*/}
			{/*    <div>*/}
			{/*        <TextArea placeholder={'add new post'}*/}
			{/*                  value={props.newPostText}*/}
			{/*                  onChange={setNewPostTextHandler}*/}
			{/*                  onKeyPress={addNewPostHandler}/>*/}
			{/*    </div>*/}
			{/*    <div>*/}
			{/*        <Button name={'Add New Post'} onClick={addNewPostHandler}/>*/}
			{/*    </div>*/}
			{/*</div>*/}

			<AddPostReduxForm onSubmit={addNewPostHandler}/>
			<div className={classes.posts}>
				{postsElements}
			</div>
		</div>
	)
});


export default MyPosts;
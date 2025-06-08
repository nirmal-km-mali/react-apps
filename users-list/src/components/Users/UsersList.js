import classes from './UsersList.module.css';
import Card from '../UI/Card';

const UsersList = (props) => {
    return (
        <Card className={classes.users}>
            <ul>
                {props.users.length === 0 && <p style={{ textAlign: 'center' }}>No users found. Maybe add one?</p>}
                {props.users.map(user =>
                    <li key={user.id}>{user.text}</li>
                )}
            </ul>
        </Card>
    );
}

export default UsersList;
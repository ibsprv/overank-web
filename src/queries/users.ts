import gql from 'graphql-tag';

export const UserQueries = {
    getUsers: gql`
        {
            userMany {
                _id
                name
            }
        }
    `,
    getUser: gql`
        query getUser($userId: MongoID!) {
            userById(_id: $userId) {
                _id
                name
                age
                gender
                languages {
                    language
                    skill
                }
            }
        }
    `,
};

export default UserQueries;

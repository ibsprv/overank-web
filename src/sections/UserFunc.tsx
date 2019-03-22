import React, { SFC, PureComponent } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { Paper, Typography, Chip } from '@material-ui/core';
import { Translate, Flag } from '@material-ui/icons';
import { UserQueries } from '../queries';

enum Gender {
    Male = 'male',
    Female = 'female',
}

interface ILanguage {
    language: string;
    skill: string;
}

interface IUser {
    _id: string;
    name: string;
    age: number;
    gender: Gender;
    languages: ILanguage[];
}

interface IMatchParams {
    userId: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {}

interface IMyPaperProps {
    user: IUser;
}

const MyPaper: SFC<IMyPaperProps> = (props) => {
    const { user } = props;
    return (
        <Paper elevation={1}>
            <Typography variant="h5" component="h3">
            {user.name}
          </Typography>
            <Typography component="p">
                {user.age}
            {' '}
                {user.gender}
          </Typography>
            {user.languages.map(lang => (
            <Chip key={lang.language} label={lang.language} variant="outlined" icon={<Flag />} color="primary" />
            ))}
      </Paper>
    );
};

const MyLoadingPaper: SFC = () => (
    <Paper elevation={1}>
        <Typography variant="h5" component="h3">
            <Translate id="loading" />
      </Typography>
        <Typography component="p" />
  </Paper>
);

const UserFunc: SFC<IProps> = (props: IProps) => {
    const { userId } = props.match.params;

    if (!userId) {
        return <div />;
    }

    return (
        <Query query={UserQueries.getUser} variables={{ userId }}>
            {({ loading, error, data }) => {
                if (loading) {
                    return MyLoadingPaper;
                }
                if (error) {
                    return (
                        <h1>
                            Error!
                            {error.message}
                      </h1>
                    );
                }

                const { userById } = data;

                return (
                    <div>
                        <MyPaper user={userById} />
                  </div>
                );
            }}
      </Query>
    );
};

export default UserFunc;

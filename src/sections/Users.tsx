import React, { PureComponent, FormEvent } from 'react';
import { Query } from 'react-apollo';
import { Link, LinkProps, RouteComponentProps, Route } from 'react-router-dom';
import { Fingerprint } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Translate } from 'react-localize-redux';
import { UserQueries } from '../queries';
import UserFunc from './UserFunc';

interface IUser {
    _id: string;
    name: string;
}

interface IState {
    selectedUserId: string;
}

interface IMatchParams {
  userId: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {};

class Users extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        // tslint:disable-next-line:no-console
        console.log(props);
        super(props);
        const { match } = this.props;
        const userId = match.params.userId || '';
        this.state = { selectedUserId: userId };
    }

    public render() {
        const { selectedUserId } = this.state;

        return (
            <Query query={UserQueries.getUsers}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return 'Loading...';
                    }
                    if (error) {
                        return `Error! ${ error.message }`;
                    }

                    let UserNavLink = null;

                    if (selectedUserId) {
                        UserNavLink = (
                            <div>
                                <Button
                                    component={props => <Link to={`/user/${ selectedUserId }`} {...props as LinkProps} />}
                                    variant="contained"
                                color="primary"
                              >
                                <Fingerprint />
                                    <Translate id="button.hello.label">Hallo</Translate>
                              </Button>
                          </div>
                        );
                    }

                    return (
                        <div>
                            <Route path="/user/:userId" component={UserFunc} />
                            <div>{selectedUserId}</div>
                            <select name="user" value={selectedUserId} onChange={this.selectUser.bind(this)}>
                                {data.userMany.map((user: IUser) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name}
                                  </option>
                                ))}
                          </select>
                            {UserNavLink}
                      </div>
                    );
                }}
          </Query>
        );
    }

    protected selectUser(e: FormEvent<HTMLSelectElement>) {
        this.setState({ selectedUserId: e.currentTarget.value });
    }
}

export default Users;

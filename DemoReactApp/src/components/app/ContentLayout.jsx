import * as React from 'react';
import { Route } from 'react-router-dom';
import { ROOT } from '../../constants/routes';
import { Tabs } from './Tabs.jsx';
import { Content } from './Content.jsx';
import { SavingStatusLayout } from './SavingStatusLayout.jsx';
import { LogoutButton } from '../../containers-redux/app/LogoutButton.jsx';
import { HeadInHelmet } from '../../containers-redux/shared/HeadInHelment.jsx';
import { Errors } from '../../containers-redux/shared/Errors.jsx';

const ContentLayout = () => (
    <div className="container">
        <div className="row">
            <HeadInHelmet />
            <div className="col-sx-12 col-md-9 col-lg-6">
                <div className="row">
                    <div className="col-xs-10 col-md-10">
                        <h1>TODO List</h1>
                    </div>
                    <div className="col-xs-2 col-md-1 text-right h6">
                        <LogoutButton />
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-xs-10 col-md-9">
                        <Tabs />
                    </div>
                    <Route
                        exact
                        path={ROOT}
                        component={SavingStatusLayout}
                    />
                </div>
                <div className="row form-group">
                    <Content />
                </div>
                <div className="row">
                    <div className="col-xs-12 h5">
                        PV247
                        &nbsp;
                        <small>2017</small>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-9 col-lg-push-1 col-lg-5">
                <div className="form-group"></div>
                <Errors />
            </div>
        </div>
    </div>
);

export { ContentLayout };
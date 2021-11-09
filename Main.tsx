import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {observer} from 'mobx-react-lite';
import React, {lazy} from 'react';
import {Switch} from 'react-router-dom';

import LazyLoader from '../../components/LazyLoader';
import {
    ADD_CV,
    CANDIDATE_PROFILE,
    ALL_EMPLOYEES,
    FORGOT,
    FORGOT_CHECK,
    FORGOT_CREATE_NEW,
    JOBS,
    MY_JOBS,
    POST_JOB, POST_JOB_SUCCESS,
    PREVIEW_JOB,
    PROFILE,
    PROFILE_PAYMENT,
    ROOT_ROUTE, SIGN_IN,
    SIGN_UP_CANDIDATE,
    SIGN_UP_CANDIDATE_FINALIZE,
    SIGN_UP_EMPLOYER,
    SIGN_UP_EMPLOYER_FINALIZE,
    SIGN_UP_SUCCESS,
    VERIFY_EMAIL
} from '../../constants/Router';
import {UserRole} from '../../interfaces';
import {PrivateRoute, PublicRoute} from '../Route';

const Landing = LazyLoader(lazy(() => import(/* webpackChunkName: 'OverviewWrapper' */'../Landing/Landing')));
const SignUp = LazyLoader(lazy(() => import(/* webpackChunkName: 'SignUp screen' */'../Auth/SignUp/SignUp')));
const SignUpSuccess = LazyLoader(lazy(() => import(/* webpackChunkName: 'SignUpSuccess screen' */'../Auth/SignUp/SignUpSuccess')));
const SignUpEmployer = LazyLoader(lazy(() => import(/* webpackChunkName: 'SignUpEmployer screen' */'../Auth/SignUp/SignUpEmployer')));
const SignUpCandidate = LazyLoader(lazy(() => import(/* webpackChunkName: 'SignUpCandidate screen' */'../Auth/SignUp/SignUpCandidate')));
const CvCreator = LazyLoader(lazy(() => import(/* webpackChunkName: 'CvCreator screen' */'../CvCreator/CvCreator')));
const PostAJob = LazyLoader(lazy(() => import(/* webpackChunkName: 'PostAJob screen' */'../Job/PostAJob')));
const PostJobSuccess = LazyLoader(lazy(() => import(/* webpackChunkName: 'PostJobSuccess screen' */'../Job/PostJobSuccess')));
const PreviewJob = LazyLoader(lazy(() => import(/* webpackChunkName: 'PreviewJob screen' */'../Job/PreviewJob')));
const MyJobs = LazyLoader(lazy(() => import(/* webpackChunkName: 'MyJobs screen' */'../Job/MyJobs')));
const Jobs = LazyLoader(lazy(() => import(/* webpackChunkName: 'Jobs screen' */'../Job/Jobs')));
const AllCandidates = LazyLoader(lazy(() => import(/* webpackChunkName: 'AllCandidates screen' */'../AllCandidates/AllCandidates')));
const CandidateProfile = LazyLoader(lazy(() => import(/* webpackChunkName: 'CandidateProfile screen' */'../Job/CandidateProfile')));
const ForgotPassword = LazyLoader(lazy(() => import(/* webpackChunkName: 'ForgotPassword screen' */'../Auth/ForgotPassword/ForgotPassword')));
const ForgotPasswordCheckEmail = LazyLoader(lazy(() => import(/* webpackChunkName: 'ForgotPasswordCheckEmail screen' */'../Auth/ForgotPassword/ForgotPasswordCheckEmail')));
const ForgotPasswordNew = LazyLoader(lazy(() => import(/* webpackChunkName: 'ForgotPasswordNew screen' */'../Auth/ForgotPassword/ForgotPasswordNew')));
const SignIn = LazyLoader(lazy(() => import(/* webpackChunkName: 'SignIn screen' */'../Auth/SignIn/SignIn')));
const Profile = LazyLoader(lazy(() => import(/* webpackChunkName: 'Profile screen' */'../Profile')));
const ProfilePayment = LazyLoader(lazy(() => import(/* webpackChunkName: 'ProfilePayment screen' */'../../modules/Profile/ProfilePayment')));
const Header = LazyLoader(lazy(() => import(/* webpackChunkName: 'Header' */'../../components/Header')));
const Footer = LazyLoader(lazy(() => import(/* webpackChunkName: 'Footer' */'../../components/Footer')));

const useStyles = makeStyles(() => ({
    root: {
        display: 'grid',
        gridAutoFlow: 'row',
        minHeight: '100vh'
    },
    menuButton: {
        marginRight: 36,
    },
    content: {
        width: '100%',
        maxWidth: 1232,
        margin: '0 auto',
        padding: '0 16px',
    },
}));

const Main = observer(() => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Header />
            <Box
                component="main"
                className={
                    classes.content
                }
            >
                <Switch>
                    <PublicRoute exact path={ROOT_ROUTE} component={Landing}/>
                    <PublicRoute path={SIGN_UP_EMPLOYER} exact component={SignUp} componentProps={{signUpAs:UserRole.Employer}} />
                    <PublicRoute path={SIGN_UP_CANDIDATE} exact component={SignUp} componentProps={{signUpAs:UserRole.Candidate}} />
                    <PublicRoute path={SIGN_UP_SUCCESS} exact component={SignUpSuccess} />
                    <PublicRoute path={`${VERIFY_EMAIL}/:token`} component={SignUpSuccess}/>
                    <PublicRoute path={FORGOT} exact component={ForgotPassword}/>
                    <PublicRoute path={FORGOT_CHECK} exact component={ForgotPasswordCheckEmail}/>
                    <PublicRoute path={`${FORGOT_CREATE_NEW}/:token`} exact component={ForgotPasswordNew}/>
                    <PublicRoute path={SIGN_IN} exact component={SignIn}/>

                    <PrivateRoute path={ADD_CV} exact component={CvCreator}/>
                    <PrivateRoute path={POST_JOB} exact component={PostAJob}/>
                    <PrivateRoute path={POST_JOB_SUCCESS} exact component={PostJobSuccess}/>
                    <PrivateRoute path={`${PREVIEW_JOB}/:id`} exact component={PreviewJob}/>
                    <PrivateRoute path={MY_JOBS} exact component={MyJobs}/>
                    <PrivateRoute path={JOBS} exact component={Jobs}/>
                    <PrivateRoute path={PROFILE_PAYMENT} exact component={ProfilePayment}/>
                    <PrivateRoute path={ALL_EMPLOYEES} exact component={AllCandidates}/>
                    <PrivateRoute path={CANDIDATE_PROFILE} exact component={CandidateProfile}/>
                    <PrivateRoute path={SIGN_UP_EMPLOYER_FINALIZE} exact component={SignUpEmployer}/>
                    <PrivateRoute path={SIGN_UP_CANDIDATE_FINALIZE} exact component={SignUpCandidate}/>
                    <PrivateRoute path={PROFILE} component={Profile}/>
                </Switch>
            </Box>
            <Footer />
        </Box>
    );
});

export default Main;

import React, {ComponentType} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik';
import styles from './Login.module.css';
import {loginTC, toggleIsFetchingLogin} from '../../state/auth-reducer';
import {AppRootStateType, useAppDispatch} from '../../state/store-redux';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Preloader} from '../Common/Preloader/Preloader';
import {LoginParamsType} from '../../api/api';

type ValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

// export type LoginPropsType = {
//     isAuth: boolean
//     isFetchingLogin: boolean
//     loginTC: (loginParams: LoginParamsType) => Promise<void>
//     toggleIsFetchingLogin: (value: boolean) => void
// }

const Login = ({isAuth, isFetchingLogin, loginTC, toggleIsFetchingLogin}: PropsFromRedux) => {
    // const dispatch = useAppDispatch();
    // const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    // const isFetchingLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isFetchingLogin)

    if (isAuth) {
        return <Navigate to={'/'}/>;
    }

    if (isFetchingLogin) {
        return <Preloader/>;
    }

    return (
        <>
            <h2 style={{color: 'var(--fourth-color)'}}>Login</h2>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validate={values => {
                    const errors: FormikErrors<ValuesType> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password.length < 4) {
                        errors.password = 'Must be 4 characters or more';
                    }
                    return errors;
                }}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    // dispatch(toggleIsFetchingLogin(true))
                    toggleIsFetchingLogin(true);

                    // const res = await dispatch(loginTC(values));
                    const res = await loginTC(values);

                    // console.log(res);


                    // @ts-ignore
                    if (res) {
                        setSubmitting(false);
                        resetForm();
                    }

                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
            >
                {({
                      values,
                      isSubmitting,
                  }) => (
                    <Form>
                        <div style={{color: 'var(--fifth-color)'}}>
                            <label htmlFor="email">email</label>
                            <Field id={'email'} name="email" type="email"/>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className={styles.ErrorMessage}
                            />
                        </div>
                        <div style={{color: 'var(--fifth-color)'}}>
                            <label htmlFor="password">password</label>
                            <Field id={'password'} name="password" type="password"/>
                            <ErrorMessage name="password"
                                          component="div"
                                          className={styles.ErrorMessage}
                            />
                        </div>
                        <div style={{color: 'var(--fifth-color)'}}>
                            <label className={styles.checkboxContainer}>
                                <Field type="checkbox" name="rememberMe"/>
                                <span className={styles.checkboxCustom}/>
                                {values.rememberMe ? 'You were remembered' : 'Remember me'}
                            </label>
                        </div>
                        <button type="submit" disabled={isSubmitting} className={styles.Button}>
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    isFetchingLogin: state.auth.isFetchingLogin,
});

// const mapDispatchToProps = {
//     loginTC,
//     toggleIsFetchingLogin,
// };

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
//     toggleIsFetchingLogin: (value: boolean) => {
//         dispatch(toggleIsFetchingLogin(value));
//     }
// })

// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
//     loginTC: (loginParams) => {
//         dispatch(loginTC(loginParams));
//     },
//     toggleIsFetchingLogin: (value) => {
//         dispatch(toggleIsFetchingLogin(value));
//     },
// });

type MapStateToPropsType = {
    isAuth: boolean
    isFetchingLogin: boolean
}

// type MapDispatchToPropsType = {
//     // loginTC: (loginParams: LoginParamsType) => Promise<void>
//     // toggleIsFetchingLogin: (value: boolean) => void
//     loginTC,
//     toggleIsFetchingLogin,
// }

// type LoginType = MapStateToPropsType & MapDispatchToPropsType

// export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppRootStateType>(mapStateToProps, {loginTC, toggleIsFetchingLogin})(Login);

type PropsFromRedux = ConnectedProps<typeof connector>;
const connector = connect(mapStateToProps, {loginTC, toggleIsFetchingLogin});
export default connector(Login);


//
// import React from 'react';
// import { ErrorMessage, Field, Form, Formik, FormikErrors } from 'formik';
// import styles from './Login.module.css';
// import { loginTC, toggleIsFetchingLogin } from '../../state/auth-reducer';
// import { AppRootStateType } from '../../state/store-redux';
// import { connect, ConnectedProps } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { Preloader } from '../Common/Preloader/Preloader';
// import { LoginParamsType } from '../../api/api';
//
// type ValuesType = {
//     email: string;
//     password: string;
//     rememberMe: boolean;
// };
//
// const mapStateToProps = (state: AppRootStateType) => ({
//     isAuth: state.auth.isAuth,
//     isFetchingLogin: state.auth.isFetchingLogin,
// });
//
// const mapDispatchToProps = {
//     loginTC,
//     toggleIsFetchingLogin,
// };
//
// const connector = connect(mapStateToProps, mapDispatchToProps);
//
// type PropsFromRedux = ConnectedProps<typeof connector>;
//
// const Login: React.FC<PropsFromRedux> = ({
//                                              isAuth,
//                                              isFetchingLogin,
//                                              loginTC,
//                                              toggleIsFetchingLogin,
//                                          }) => {
//     if (isAuth) {
//         return <Navigate to="/" />;
//     }
//
//     if (isFetchingLogin) {
//         return <Preloader />;
//     }
//
//     return (
//         <>
//             <h2 style={{ color: 'var(--fourth-color)' }}>Login</h2>
//             <Formik
//                 initialValues={{ email: '', password: '', rememberMe: false }}
//                 validate={(values) => {
//                     const errors: FormikErrors<ValuesType> = {};
//                     if (!values.email) {
//                         errors.email = 'Required';
//                     } else if (
//                         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
//                     ) {
//                         errors.email = 'Invalid email address';
//                     }
//                     if (!values.password) {
//                         errors.password = 'Required';
//                     } else if (values.password.length < 4) {
//                         errors.password = 'Must be 4 characters or more';
//                     }
//                     return errors;
//                 }}
//                 onSubmit={async (values, { setSubmitting, resetForm }) => {
//                     toggleIsFetchingLogin(true);
//                     await loginTC(values);
//                     setSubmitting(false);
//                     resetForm();
//                 }}
//             >
//                 {({ values, isSubmitting }) => (
//                     <Form>
//                         <div style={{ color: 'var(--fifth-color)' }}>
//                             <label htmlFor="email">email</label>
//                             <Field id="email" name="email" type="email" />
//                             <ErrorMessage
//                                 name="email"
//                                 component="div"
//                                 className={styles.ErrorMessage}
//                             />
//                         </div>
//                         <div style={{ color: 'var(--fifth-color)' }}>
//                             <label htmlFor="password">password</label>
//                             <Field id="password" name="password" type="password" />
//                             <ErrorMessage
//                                 name="password"
//                                 component="div"
//                                 className={styles.ErrorMessage}
//                             />
//                         </div>
//                         <div style={{ color: 'var(--fifth-color)' }}>
//                             <label className={styles.checkboxContainer}>
//                                 <Field type="checkbox" name="rememberMe" />
//                                 <span className={styles.checkboxCustom} />
//                                 {values.rememberMe
//                                     ? 'You were remembered'
//                                     : 'Remember me'}
//                             </label>
//                         </div>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className={styles.Button}
//                         >
//                             {isSubmitting ? 'Sending...' : 'Submit'}
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//         </>
//     );
// };
//
// export default connector(Login);

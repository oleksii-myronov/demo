import {makeStyles} from '@material-ui/core/styles';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Form} from 'react-final-form';
import {useTranslation} from 'react-i18next';

import CustomButton from '../../components/Button';
import ContentWhiteWrapper from '../../components/ContentWhiteWrapper';
import PasswordField from '../../components/PasswordField';
import TranslatedString from '../../components/TranslatedString';
import password from '../../helpers/validators/password';
import {useStores} from '../../hooks/use-stores';

const useStyles = makeStyles((theme) => ({
    titleH2: {
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: '24px'
    },
    subtitle: {
        marginBottom: 20,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '17px'
    },
    whiteWrapper: {
        padding: 32
    },
    detailsItem: {
        marginBottom: 24,
        borderBottom: `1px solid ${theme.extendPalette.lightGray}`,
        '&:last-child': {
            marginBottom: 0,
            borderBottom: 'none'
        }
    },
    bottomPanel: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    submitBtn: {
        paddingRight: 24,
        paddingLeft: 24
    },
    deleteBtn: {
        color: theme.extendPalette.errorColor
    }
}));

interface IFormValues {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
}

const ProfileLoginDetails = observer(() => {
    const {t} = useTranslation();
    const classes = useStyles();
    const {
        rootStore: {
            authStore: {
                user: {changePassword, clearPasswordError, passwordError},
            }
        },
    } = useStores();

    const validate = useCallback((values:IFormValues): Record<string, string> => {
        clearPasswordError();
        const errors: Record<string, any> = {};
        const requiredFields: string[] = [
            'currentPassword',
            'newPassword',
            'repeatPassword'
        ];

        requiredFields.forEach((field: string) => {
            if (!values[field]) {
                errors[field] = t('required_field');
            }
        });

        if (values['newPassword'] !== values['repeatPassword']) {
            errors['repeatPassword'] = t('passwords_should_match');
        }
        if (!password(values['newPassword'])) {
            errors['newPassword'] = t('wrong_password');
        }

        return errors;
    }, [clearPasswordError, t]);

    const onSubmit = useCallback(async (values: IFormValues,form) => {
        const error = await changePassword(values);

        if (!error){
            form.restart();
        }
    }, [changePassword]);

    return (
        <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <ContentWhiteWrapper
                        className={classes.whiteWrapper}
                    >
                        <div className={classes.detailsItem}>
                            <TranslatedString
                                className={classes.titleH2}
                                translateKey="login_details"
                                variant="h2"
                            />
                        </div>

                        <div className={classes.detailsItem}>
                            <TranslatedString
                                translateKey="change_password"
                                className={classes.subtitle}
                            />

                            <PasswordField
                                name="currentPassword"
                                label="current_password"
                                passwordError={passwordError}
                            />

                            <PasswordField
                                name="newPassword"
                                label="new_password"
                            />

                            <PasswordField
                                name="repeatPassword"
                                label="confirm_password"
                            />

                            <div className={classes.bottomPanel}>
                                <CustomButton
                                    className={classes.submitBtn}
                                    variant="contained"
                                    color="primary"
                                    text="save"
                                    type='submit'
                                />

                                <CustomButton
                                    className={classes.deleteBtn}
                                    variant="text"
                                    color="primary"
                                    text="delete_account"
                                />
                            </div>

                        </div>
                    </ContentWhiteWrapper>
                </form>
            )}
        />
    );
});


export default ProfileLoginDetails;

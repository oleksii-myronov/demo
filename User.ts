import {action, computed, makeObservable, observable} from 'mobx';

import {AuthResponse, IError, RootStore,UserRole} from '../interfaces';
import {CandidateModel, ICandidateModel} from './Candidate';
import {EmployerModel, IEmployerModel} from './Employer';

export type IUserCreator = Partial<AuthResponse>;

export interface DrivingCategories {
    id: number;
    category: string;
}

export interface IUserModel {
    id: number;
    email: string;
    role: UserRole;
    firstName: string;
    lastName : string;
    companyName: string;
    completed: boolean;
    employer: IEmployerModel;
    candidate: ICandidateModel;
    passwordError:  Pick<IError, 'message'>;
    changePassword: (values: {
        currentPassword: string;
        newPassword: string;
        repeatPassword: string;
    }) => Promise<Pick<IError, 'message'>>;
    getProfile: () => Promise<void>;
    clearPasswordError: () => void;
    userName: string;
    drivingCategories: Array<DrivingLicense>;
    getDrivingCategories: () => void;
}

export interface DrivingLicense {
    id: number;
    category: string;
}

export class UserModel implements IUserModel {
    id: number = null;
    email: string = null;
    role: UserRole = null;
    firstName: string = null;
    lastName : string = null;
    companyName: string = null;
    completed: boolean = false;
    employer: IEmployerModel = null;
    candidate: ICandidateModel = null;
    passwordError: Pick<IError, 'message'> = null;
    drivingCategories: Array<DrivingLicense> = null;

    constructor(
        private rootStore: RootStore,
        {id,email,role,firstName,lastName,companyName, completed}: IUserCreator
    )
    {
        this.rootStore = rootStore;
        this.id = id;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.completed = completed;

        this.employer = role === UserRole.Employer && new EmployerModel(this.rootStore);
        this.candidate = role === UserRole.Candidate && new CandidateModel(this.rootStore);

        makeObservable(this, {
            id: observable,
            email: observable,
            role: observable,
            firstName: observable,
            lastName : observable,
            companyName: observable,
            completed: observable,
            employer:observable,
            candidate: observable,
            passwordError: observable,
            drivingCategories: observable,
            userName: computed,
            changePassword: action.bound,
            getProfile: action.bound,
            clearPasswordError: action.bound,
            getDrivingCategories: action.bound
        });
    }

    public async changePassword (values: {
        currentPassword: string;
        newPassword: string;
        repeatPassword: string;
    }): Promise<Pick<IError, 'message'>>{
        this.passwordError = null;
        try {
            await this.rootStore.requester.userService.updateLoginDetails(values);
            alert('password changed successfully');
        } catch (err) {
            console.error(err);
            this.passwordError = err.message;

            return this.passwordError;
        }
    }

    public async getProfile() {
        try {
            if (this.role === UserRole.Employer){
                const data = await this.rootStore.requester.employerService.getEmployerCompanyDetails();

                this.employer.setValues(data);
            }
            if (this.role === UserRole.Candidate){
                const data = await this.rootStore.requester.candidateService.getPersonalInformation();

                this.candidate.setValues(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    public clearPasswordError(){
        this.passwordError = null;
    }

    public get userName(){
        if (!this.role) return '';

        return this.role === UserRole.Employer ? this.companyName: `${this.firstName} ${this.lastName}`;
    }

    public async getDrivingCategories(){
        try {
            this.drivingCategories = await this.rootStore.requester.userService.getDrivingCategories();
        } catch (err) {
            console.error(err);
        }
    }
}

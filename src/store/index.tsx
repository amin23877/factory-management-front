import * as React from "react";
import { ILogedinEmployee, login } from "../api/employee";

const StorageKey = "phocus_session";

export const getToken = () => {
    const emp = localStorage.getItem(StorageKey);
    if (emp) {
        return JSON.parse(emp).token;
    }
};

interface IContext {
    employee: ILogedinEmployee | null;
    Login: (d: { username: string; password: string }) => any;
    Logout: () => void;
}

export const AuthContext = React.createContext<IContext>({ employee: null, Login: () => {}, Logout: () => {} });

export const ProvideAuth = ({ children }: { children: React.ReactNode }) => {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};

const useProvideAuth = () => {
    const [employee, setEmployee] = React.useState<ILogedinEmployee | null>(null);

    const Login = async (data: { username: string; password: string }) => {
        try {
            const resp = await login(data);
            if (resp.employee) {
                localStorage.setItem(StorageKey, JSON.stringify(resp));
                setEmployee(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Logout = () => {
        localStorage.removeItem(StorageKey);
        setEmployee(null);
    };

    React.useEffect(() => {
        const emp = localStorage.getItem(StorageKey);
        if (emp) {
            setEmployee(JSON.parse(emp));
        } else {
            setEmployee(null);
        }
    }, []);

    return { employee, Login, Logout };
};

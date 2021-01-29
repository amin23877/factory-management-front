import * as React from "react";
import { ILogedinEmployee, login } from "../api/employee";

const strName = "phocus_session";

interface IContext {
    employee: ILogedinEmployee | null;
    Login: (d: { username: string; password: string }) => Promise<void>;
    Logout: () => void;
}

export const AuthContext = React.createContext<IContext | null>(null);

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
                localStorage.setItem(strName, JSON.stringify(resp));
                setEmployee(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Logout = () => {
        localStorage.removeItem(strName);
        setEmployee(null);
    };

    React.useEffect(() => {
        const emp = localStorage.getItem(strName);
        if (emp) {
            setEmployee(JSON.parse(emp));
        } else {
            setEmployee(null);
        }
    }, []);

    return { employee, Login, Logout };
};

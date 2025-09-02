
import { signIn } from '@/auth-client';
import { useRouter } from 'next/navigation';
import {useState, useCallback} from 'react';
import { useForm } from 'react-hook-form';

interface FormProps {
    email: string;
    password: string;
    remember: boolean;
}

interface UseLoginFormReturn {
    loading: boolean;
    error?: string;
    login: () => Promise<void>;
    form: ReturnType<typeof useForm<FormProps>>;
}

export function useLoginForm(): UseLoginFormReturn {

    const router = useRouter();
    const form = useForm<FormProps>({
        defaultValues: { email: '', password: '', remember: false },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const login = useCallback(form.handleSubmit(async () => {
        setLoading(true);
        setError(undefined);
        const result = await signIn.email({ email: form.getValues('email'), password: form.getValues('password') });
        if (result.error) {
            setError(result.error?.message);
        } else if (result.data) {
            router.push('/');
        }
        setLoading(false);
    }), [form, signIn, router]);


    return { loading, error, login, form };
}

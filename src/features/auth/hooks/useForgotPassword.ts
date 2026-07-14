import { useState } from 'react';
import { requestPasswordResetApi, verifyResetCodeApi, resetPasswordApi } from '@/features/auth/api/auth.api';

export function useForgotPassword() {
    const [step, setStep] = useState('EMAIL');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await requestPasswordResetApi(email);
            setStep('CODE');
        } catch (err: any) {
            setError(err.message || 'Error al solicitar el código');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await verifyResetCodeApi(email, code);
            setStep('NEW_PASSWORD');
        } catch (err: any) {
            setError(err.message || 'Código inválido');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);

        try {
            await resetPasswordApi(email, password);
            setStep('SUCCESS');
        } catch (err: any) {
            setError(err.message || 'Error al restablecer la contraseña');
        } finally {
            setLoading(false);
        }
    };

    return {
        step, setStep,
        email, setEmail,
        code, setCode,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, setError,
        loading,
        handleRequestCode,
        handleVerifyCode,
        handleResetPassword
    };
}

import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Object>(initialValue: T) => {
    const [formState, setFormState] = useState(initialValue);

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialValue);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    };
};

// import { useEffect, useMemo, useState, ChangeEvent } from 'react';

// export const useForm = (initialForm: any, formValidations?: any) => {
//     const [formState, setFormState] = useState(initialForm);
//     const [formValidation, setFormValidation] = useState<any>({});

//     useEffect(() => {
//         createValidators();
//     }, [formState]);

//     useEffect(() => {
//         setFormState(initialForm);
//     }, [initialForm]);

//     const isFormValid = useMemo(() => {
//         for (const formValue of Object.keys(formValidation)) {
//             if (formValidation[formValue] !== null) return false;
//         }

//         return true;
//     }, [formValidation]);

//     const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = target;
//         setFormState({
//             ...formState,
//             [name]: value,
//         });
//     };

//     const onResetForm = () => {
//         setFormState(initialForm);
//     };

//     const createValidators = () => {
//         const formCheckedValues: any = {};

//         for (const formField of Object.keys(formValidations)) {
//             const [fn, errorMessage] = formValidations[formField];

//             formCheckedValues[`${formField}Valid`] = fn(formState[formField])
//                 ? null
//                 : errorMessage;
//         }

//         setFormValidation(formCheckedValues);
//     };

//     return {
//         ...formState,
//         formState,
//         onInputChange,
//         onResetForm,

//         ...formValidation,
//         isFormValid,
//     };
// };

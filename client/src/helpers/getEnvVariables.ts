export const getEnvVariables = () => {
    import.meta.env;

    console.log( import.meta.env )
    return {
        ...import.meta.env,
    };
};

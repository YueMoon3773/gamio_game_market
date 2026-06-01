import { regex, success, z } from 'zod';

const bannedNames = [
    'nicki',
    'ni cki',
    'n icki',
    'n i c ki',
    'n i c k i',
    'nic ki',
    'minaj',
    'm ina j',
    'm in a j',
    'm i n a j',
    'mi naj',
    'min aj',
    'nickiminaj',
    'nicki',
    'nickj',
    'njckj',
    'minaj',
    'mjnaj',
    'onika tanya maraj-petty',
    'onika tanya nicki maraj-petty',
    'onika tanya nicki maraj petty',
    'onika tanya nicki maraj',
    'onika tanya nicki minaj',
    'onika tanya maraj petty',
    'onika tanya petty',
    'onika tanya',
    'onikatanyapetty',
    'onika petty',
    'onikatanyamarajpetty',
    'onikatanyamaraj-petty',
    'onika maraj',
    'onikamaraj',
    'maraj',
    'onika tanya maraj',
    'maraj-petty',
    'maraj',
    'marajpetty',
    'barbs',
    'israel',
];
const bannedNamesRegex = new RegExp(`\\b(${bannedNames.join('|')})\\b`, 'i');

const formInpValidator = () => {
    const userNameRequirements = [
        {
            id: 0,
            validator: z.string().trim().min(3).max(16),
            displayMessage: '3-16 characters long.',
        },
        {
            id: 1,
            validator: z
                .string()
                .trim()
                .refine((val) => !bannedNamesRegex.test(val))
                .regex(/^[a-zA-Z0-9\-_]+$/),
            displayMessage: 'Contain only letters, numbers, hyphen and underscore.',
        },
    ];

    const pwdRequirement = [
        {
            id: 0,
            validator: z.string().trim().min(8).max(32),
            displayMessage: '8-32 characters long.',
        },
        {
            id: 1,
            validator: z
                .string()
                .trim()
                .regex(/(?=.*[A-Z])/),
            displayMessage: 'At least one uppercase.',
        },
        {
            id: 2,
            validator: z
                .string()
                .trim()
                .regex(/(?=.*[a-z])/),
            displayMessage: 'At least one lowercase.',
        },
        {
            id: 3,
            validator: z
                .string()
                .trim()
                .regex(/(?=.*[0-9])/),
            displayMessage: 'At least one number.',
        },
        {
            id: 4,
            validator: z
                .string()
                .trim()
                .regex(/(?=.*[,.?\/!@#$%^&*\-_=+])/),
            displayMessage: 'At least one symbol (,.?/!@#$%^&*-_=+).',
        },
    ];

    const retypePwdRequirements = [
        {
            id: 0,
            validator: (pwd, retypePwd) => {
                if (pwd !== '' && retypePwd !== '' && pwd === retypePwd) return { success: true };
                else return { success: false };
            },
            displayMessage: 'Match to password field.',
        },
    ];

    const userNameValidator = z
        .string()
        .trim()
        .min(3)
        .max(16)
        .refine((val) => !bannedNamesRegex.test(val))
        .regex(/^[a-zA-Z0-9\-_]$/);

    const passwordValidator = z
        .string()
        .trim()
        .min(8)
        .max(32)
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[,.?\/!@#$%^&*\-_=+])[a-zA-Z0-9,.?\/!@#$%^&*\-_=+]+$/);

    return {
        userNameRequirements,
        pwdRequirement,
        retypePwdRequirements,
        userNameValidator,
        passwordValidator,
    };
};

export default formInpValidator;

import appointment_img from './appointment_img.png'
import header_img from './header_img.jpeg'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.jpg'
import profile_pic2 from './profile_pic2.jpeg'
import contact_image from './contact_image.jpeg' 
import about_image from './about_image.png'
import logo from './logo.jpeg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import counselor1 from './counselor1.jpeg'
import counselor2 from './counselor2.jpeg'
import counselor3 from './counselor3.jpeg'
import counselor4 from './counselor4.jpeg'
import counselor5 from './counselor5.jpeg'
import counselor6 from './counselor6.jpeg'
import counselor7 from './counselor7.jpeg'
import counselor8 from './counselor8.jpeg'
import counselor9 from './counselor9.jpeg'
import counselor10 from './counselor10.jpeg'
import counselor11 from './counselor11.jpeg'
import counselor12 from './counselor12.jpeg'
import counselor13 from './counselor13.jpeg'
import counselor14 from './counselor14.jpeg'
import counselor15 from './counselor15.jpeg'
import Psychiatrists from './Psychiatrists.svg'
import Therapists  from './Therapists .svg'
import Psychologists  from './Psychologists .svg'
import Counselors from './Counselors.svg'
import Psychoanalysts from './Psychoanalysts.svg'
import AddictionCounselors  from './Addiction Counselors .svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    profile_pic2,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'Psychologists',
        image: Psychologists 
    },
    {
        speciality: 'Counselors',
        image: Counselors
    },
    {
        speciality: 'Psychiatrists',
        image:Psychiatrists
    },
    {
        speciality: 'Addiction Counselors',
        image: AddictionCounselors 
    },
    {
        speciality: 'Psychoanalysts',
        image: Psychoanalysts
    },
    {
        speciality: 'Therapists',
        image: Therapists 
    },
]

export const counselors = [
    {
        _id: 'counselor1',
        name: 'Dr. Richard James',
        image: counselor1,
        speciality: 'Psychologists ',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James has a strong commitment to delivering comprehensive medical care,  Professionals trained in psychology who provide therapy and counseling but typically do not prescribe medication (except in some jurisdictions).',
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor2',
        name: 'Dr. Emily Larson',
        image: counselor2,
        speciality: 'Counselors',
        degree: 'MBBS',
        experience: '3 Years',
        about: ' Trained professionals who provide guidance and support for a range of mental health and life issues',
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor3',
        name: 'Dr. Sarah Patel',
        image: counselor3,
        speciality: 'Psychiatrists',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah Patel is a Medical doctor who specialize in diagnosing and treating mental illnesses, often prescribing medication',
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor4',
        name: 'Dr. Christopher Lee',
        image: counselor4,
        speciality: 'Addiction Counselors',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christoper Lee is a Specialists focused on helping individuals struggling with substance use disorders or addictive behaviors.',
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor5',
        name: 'Dr. Jennifer Garcia',
        image: counselor5,
        speciality: 'Psychoanalysts',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia is a Specialist who use psychoanalysis to explore the unconscious mind and its influence on thoughts and behavior.',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor6',
        name: 'Dr. Andrew Williams',
        image: counselor6,
        speciality: 'Psychoanalysts',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams is a Specialists who use psychoanalysis to explore the unconscious mind and its influence on thoughts and behavior.',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor7',
        name: 'Dr. Christopher Davis',
        image: counselor7,
        speciality: 'Psychologists ',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, Professionals trained in psychology who provide therapy and counseling but typically do not prescribe medication (except in some jurisdictions).',
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor8',
        name: 'Dr. Timothy White',
        image: counselor8,
        speciality: 'Counselors',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy white is a trained professional who provide guidance and support for a range of mental health and life issues',
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor9',
        name: 'Dr. Ava Mitchell',
        image: counselor9,
        speciality: 'Psychiatrists',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ava Mitchell Medical doctors who specialize in diagnosing and treating mental illnesses, often prescribing medication',
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor10',
        name: 'Dr. Jeffrey King',
        image: counselor10,
        speciality: 'Addiction Counselors ',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffry King is a Specialist focused on helping individuals struggling with substance use disorders or addictive behaviors.',
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor11',
        name: 'Dr. Zoe Kelly',
        image: counselor11,
        speciality: 'Therapists',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly is a Specialist who use psychoanalysis to explore the unconscious mind and its influence on thoughts and behavior',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor12',
        name: 'Dr. Patrick Harris',
        image: counselor12,
        speciality: 'Psychoanalysts',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris Specialists who use psychoanalysis to explore the unconscious mind and its influence on thoughts and behavior',
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor13',
        name: 'Dr. Chloe Evans',
        image: counselor13,
        speciality: 'Psychologists ',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, Professionals trained in psychology who provide therapy and counseling but typically do not prescribe medication (except in some jurisdictions).',
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor14',
        name: 'Dr. Ryan Martinez',
        image: counselor14,
        speciality: 'Counselors',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez is a trained professionals who provide guidance and support for a range of mental health and life issues',
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'counselor15',
        name: 'Dr. Amelia Hill',
        image: counselor15,
        speciality: 'Psychiatrists',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Amelia Hill is a Medical doctor who specialize in diagnosing and treating mental illnesses, often prescribing medication',
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]


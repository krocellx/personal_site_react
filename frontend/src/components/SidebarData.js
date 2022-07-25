import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
// import * as FaIcons from 'react-icons/fa';
// import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  {
    title: 'Image Search',
    path: '/image-search',
    icon: <AiIcons.AiFillPicture />,
  },
  {
    title: 'Stock Performance',
    path: '/stock-performance',
    icon: <AiIcons.AiOutlineStock />,
  },
  // {
  //   title: 'Team',
  //   path: '/team',
  //   icon: <IoIcons.IoMdPeople />,
  // },
  // {
  //   title: 'Messages',
  //   path: '/messages',
  //   icon: <FaIcons.FaEnvelopeOpenText />,

  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Message 1',
  //       path: '/messages/message1',
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //     {
  //       title: 'Message 2',
  //       path: '/messages/message2',
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Reports',
  //   path: '/reports',
  //   icon: <IoIcons.IoIosPaper />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,

  //   subNav: [
  //     {
  //       title: 'Reports',
  //       path: '/reports/reports1',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav',
  //     },
  //     {
  //       title: 'Reports 2',
  //       path: '/reports/reports2',
  //       icon: <IoIcons.IoIosPaper />,
  //       cName: 'sub-nav',
  //     },
  //     {
  //       title: 'Reports 3',
  //       path: '/reports/reports3',
  //       icon: <IoIcons.IoIosPaper />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Support',
  //   path: '/support',
  //   icon: <IoIcons.IoMdHelpCircle />,
  // },
];

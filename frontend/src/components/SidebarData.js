import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
// import * as MdIcons from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Equity Research',
    path: '/equity-research',
    icon: <AiIcons.AiOutlineStock />,
  },
  // {
  //   title: 'Portfolio Construction',
  //   path: '/portfolio-construction',
  //   icon: <AiIcons.AiFillPieChart />,
  //   subNav: [
  //     {
  //       title: 'Factor Investing Using CMAs',
  //       path: '/portfolio-construction/factor-investing-using-cmas',
  //       icon: <AiIcons.AiFillExperiment />,
  //     },
  //   ],
  // },
  {
    title: 'Factor Investing Using CMAs',
    path: '/portfolio-construction/factor-investing-using-cmas',
    icon: <AiIcons.AiFillExperiment />,
  },
  {
    title: 'q-Factor Regression Analysis',
    path: '/q-factor-example',
    icon: <FaIcons.FaChartPie />,
  },
  {
    title: 'Image Search',
    path: '/image-search',
    icon: <AiIcons.AiFillPicture />,
  },

  {
    title: 'Experiment',
    path: '/experiment',
    icon: <AiIcons.AiFillExperiment />,
  },
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

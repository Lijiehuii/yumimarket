import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'
import ClassificationView from '../views/ClassView/ClassificationView.vue'
import ShoppingCartView from '../views/ShoppingCartView/ShoppingCartView.vue'
import StrategyView from '../views/StrategyView/StrategyView.vue'
import MineView from '../views//MineView/MineView.vue'
import NavSearch from '@/views/HomeView/NavSearch.vue'
import SearchRuslt from '@/views/HomeView/SearchRuslt.vue'
import ShoppingMall from '@/views/ShoppingMall/ShopStore.vue'
import LoginView from "@/views/LoginView/LoginView";
import RegisterView from "@/views/RegisterView/RegisterView"


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'search',
        name: 'search',
        component: NavSearch,

      },
      {
        path: 'ruslt',
        name: 'ruslt',
        component: SearchRuslt
      },

      {
        path: 'changeShop',
        name: 'changeShop',
        component: () => import('@/views/HomeView/ChangeShop.vue')
      }

    ]
  },
  {
    path: '/classification',
    name: 'classification',
    component: ClassificationView,
    children: [

    ]
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    component: ShoppingCartView
  },
  {
    path: '/strategy',
    name: 'strategyView',
    component: StrategyView,
  },
  {
    path: '/mineView',
    name: 'mineView',
    component: MineView,

    children: [
      {
        path: 'administration',
        name: 'administration',
        component: () => import("../views/MineView/MineAdministration.vue"),

        children: [
          {
            path: 'aboutus',
            name: 'aboutus',
            component: () => import("../views/MineView/AboutUs.vue")
          },
          {
            path: 'privacy',
            name: 'privacy',
            component: () => import("../views/MineView/MinePrivacy")
          }
        ],
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import("../views/MineView/MineShop.vue"),
      },
      {
        path: 'distributioncenter',
        name: 'distributioncenter',
        component: () => import("../views/MineView/DistributionCenter.vue")
      },
      {
        path: 'myCollection',
        name: 'myCollection',
        component: () => import('../views/MineView/MyCollection.vue')
      }
    ],
  },
  {
    path: '/details',
    name: 'details',
    component: () => import("../views/CommodityDetailsView/CommodityDetailsView.vue"),
  },
  {
    path: '/details/comment',
    name: 'comment',
    component: () => import('../views/CommodityDetailsView/CommentView.vue')
  },
  {
    path: "/strategy/questionDetail",
    name: "questionDetail",
    component: () => import("../views/StrategyView/QuestionDetaiView.vue")
  },

  {
    path: "/shopstore",
    name: "shopstore",
    component: ShoppingMall,
  },
  {
    path: '/selectedItems',
    name: '/selectedItems',
    component: () => import('@/components/SelectedItems/SelectedItems.vue')
  },
  {
    path: '/settlementview',
    name: 'settlementview',
    component: () => import('@/components/SettlementView.vue')
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/findpwd",
    name: "findpwd",
    component: () => import("../views/FindPwd/FindPwdView"),
  },
  {
    path: "/zhifu",
    name: "zhifu",
    component: () => import("../components/ZhiFu.vue"),
  },

  {
    path: "/userInfo",
    name: "userInfo",
    component: () => import("../views/UserInfoView/UserInfoView"),
  },
  {
    path: "/userInfo/editNickName",
    name: "userInfo/editNickName",
    component: () => import("../views/UserInfoView/EditView/EditNickNameView.vue"),
  },
  {
    path: "/userInfo/editSignv",
    name: "/userInfo/editSignv",
    component: () => import("../views/UserInfoView/EditView/EditSignVew.vue"),
  },
  {
    path: "/userInfo/editSchool",
    name: "userInfo/editSchool",
    component: () => import("../views/UserInfoView/EditView/EditSchoolView.vue"),
  },
  {
    path: "/mineView/administration/accountSafe",
    name: "accountSafe",
    component: () => import("../views/MineView/AccountSafeView/AccountSafeView"),
  },
  {
    path: "/mineView/administration/accountSafe/changePhone",
    name: "changePhone",
    component: () => import("../views/MineView/AccountSafeView/changePhoneView"),
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

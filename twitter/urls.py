from django.conf.urls import url

from twitter.serializersStuff.serializer_operations import *
from django.urls import path,include
from django.contrib import admin
from django.conf import settings
from twitter.views import *

from twitter.serializersStuff.serializers import *
urlpatterns = [
    path('posts',posts_list.as_view(),name='allposts'),
    path('userposts',user_posts_list.as_view(),name='allposts'),
    path('specificuserposts/<int:uid>',specific_user_posts_list.as_view(),name='allposts'),
    path('following',following_list.as_view(),name='allfollowing'),
    path('comments/<int:postid>',comments_list.as_view(),name='allcomments'),
    path('replys/<int:commentid>',replys_list.as_view(),name='allreplys'),
    path('addfollowing',add_following.as_view(),name='addfollowing'),
    path('addpost',add_posts.as_view(),name='addpost'),
    path('addprofilepic',add_profilepic.as_view(),name='addprofilepic'),
    path('addcomment/<int:postid>',add_comments.as_view(),name='addcomments'),
    path('addreply/<int:commentid>',add_replys.as_view(),name='addreply'),
    path('getPost/<int:postid>',getPost.as_view(),name='getPost'),
    path('getProfilePic',getProfilePic.as_view(),name='getProfilePic'),
path('getdp/<int:uid>',getdp.as_view(),name='getProfilePic'),
    path('getcomment/<int:commentid>',getComment.as_view(),name='getComment'),
    path('getFollowing',getfollowing.as_view(),name='getFollowing'),
    path('getFollowers',getfollowers.as_view(),name='getFollowers'),
path('getUsers',getUsers.as_view(),name='getUsers'),
    path('likepost/<int:id>',likepost.as_view(),name="likepost"),
path('unlikepost/<int:id>',unlikepost.as_view(),name="unlikepost"),
    url(r'^login', login),
url(r'^signupview/', SignupView.as_view())
]
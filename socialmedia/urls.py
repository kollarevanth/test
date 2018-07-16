"""socialmedia URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.conf import settings
import twitter
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls.static import static
from twitter import urls
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('twitter/',include(twitter.urls)),
url(r'^api-auth/', include('rest_framework.urls')),
url(r'^api-token-auth/', obtain_jwt_token),
url(r'^', TemplateView.as_view(template_name="index.html")),
]+static(settings.STATIC_URL, document_root=settings.MEDIA_ROOT)

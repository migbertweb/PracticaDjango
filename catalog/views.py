from django.shortcuts import render
from .models import Book, Author, BookInstance, Genre
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin


def index(request):
    """
    Función vista para la página inicio del sitio.
    """
    # Genera contadores de algunos de los objetos principales
    num_books = Book.objects.all().count()
    num_instances = BookInstance.objects.all().count()
    # Libros disponibles (status = 'a')
    num_instances_available = BookInstance.objects.filter(
        status__exact='a').count()
    # El 'all()' esta implícito por defecto.
    num_authors = Author.objects.count()
    # Contador de Generos
    num_genre = Genre.objects.count()
    # Libros con la palabra Orinoco
    num_filter_book = Book.objects.filter(
        summary__icontains='Julio').count()
    # Numero de visitas a esta view, como está contado en la
    # variable de sesión.
    num_visits = request.session.get('num_visits', 0)
    request.session['num_visits'] = num_visits + 1
    context = {
        'num_books': num_books,
        'num_instances': num_instances,
        'num_instances_available': num_instances_available,
        'num_authors': num_authors,
        'num_visits': num_visits,
        'num_filter_book': num_filter_book,
        'num_genre': num_genre
    }

    # Carga la plantilla index.html con la información adicional
    # en la variable context.
    return render(request, 'index.html', context=context)


class BookListView(generic.ListView):
    model = Book
    paginate_by = 5
    # your own name for the list as a template variable
    # context_object_name = 'book_list'
    # queryset = Book.objects.filter(title__icontains='war')[
    #    :5]  # Get 5 books containing the title war
    # Specify your own template name/location
    # template_name = 'books/my_arbitrary_template_name_list.html'


class BookDetailView(generic.DetailView):
    model = Book


class AuthorListView(generic.ListView):
    model = Author
    paginate_by = 5


class AuthorDetailView(generic.DetailView):
    model = Author


class LoanedBooksByUserListView(LoginRequiredMixin, generic.ListView):
    """
    Generic class-based view listing books on loan to current user.
    """
    model = BookInstance
    template_name = 'catalog/bookinstance_list_borrowed_user.html'
    # paginate_by = 5

    def get_queryset(self):
        return BookInstance.objects.filter(
            borrower=self.request.user).filter(
            status__exact='o').order_by('due_back')
